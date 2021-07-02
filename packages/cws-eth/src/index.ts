/* eslint-disable no-param-reassign */
import { coin as COIN, setting } from '@coolwallet/core';
import * as ethSign from './sign';
import { pubKeyToAddress } from './utils/ethUtils';
import * as types from './config/types';
import * as scriptUtils from './utils/scriptUtils';
import * as scriptUtilsEIP1559 from './utils/scriptUtilsEIP1559';
import * as params from './config/params';
import { TOKENTYPE } from './config/tokenType';

export { TOKENTYPE };

export default class ETH extends COIN.ECDSACoin implements COIN.Coin {
  constructor() {
    super(params.COIN_TYPE);
  }

  async getAddress(
    transport: types.Transport,
    appPrivateKey: string,
    appId: string,
    addressIndex: number
  ): Promise<string> {
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    return pubKeyToAddress(publicKey);
  }

  async getAddressByAccountKey(
    accPublicKey: string,
    accChainCode: string,
    addressIndex: number
  ): Promise<string> {
    const publicKey = await this.getAddressPublicKey(
      accPublicKey, accChainCode, addressIndex
    );
    return pubKeyToAddress(publicKey);
  }

  /**
   * Sign Ethereum Transaction.
   * @param {{nonce:string, gasPrice:string, gasLimit:string, to:string,
   * value:string, data:string, chainId: number}} transaction
   * @param {Number} addressIndex
   * @param {String} publicKey
   * @param {Function} confirmCB
   * @param {Function} authorizedCB
   */
  async signTransaction(
    signTxData: types.signTx
  ): Promise<string> {
    const { value, data, to } = signTxData.transaction;
    // eth
    if (value && !data) {
      return this.signTransferTransaction(signTxData);
    }

    // erc20
    const functionHash = data.startsWith('0x') ? data.slice(2, 10) : data.slice(0, 8);

    if (data && functionHash === 'a9059cbb') {
      const upperCaseAddress = to.toUpperCase(); // contractAddr
      let tokenSignature;
      for (const tokenInfo of TOKENTYPE) { // get tokenSignature
        if (tokenInfo.contractAddress.toUpperCase() === upperCaseAddress) {
          tokenSignature = tokenInfo.signature;
          signTxData.transaction.option.info.symbol = tokenInfo.symbol;
          signTxData.transaction.option.info.decimals = tokenInfo.unit;
          break;
        }
      }

      const { symbol, decimals } = signTxData.transaction.option.info;
      if (symbol && decimals) {
        if (tokenSignature) { // 內建
          return this.signERC20Transaction(signTxData, tokenSignature);
        }
        // 自建
        return this.signERC20Transaction(signTxData);
      }
    }

    // smart contract
    return this.signSmartContractTransaction(signTxData);
  }

  async signEIP1559Transfer(
    signTxData: types.signEIP1559Tx
  ): Promise<string> {
    const {
      transport, appPrivateKey, appId, addressIndex, transaction
    } = signTxData;
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    const argument = await scriptUtilsEIP1559.getTransferArgument(
      transaction, addressIndex
    );
    const script = params.EIP1559Transfer.scriptWithSignature;

    return ethSign.signEIP1559Transaction(
      signTxData,
      script,
      argument,
      publicKey,
    );
  }

  async signEIP1559ERC20(
    signTxData: types.signEIP1559Tx, tokenSignature = ''
  ): Promise<string> {
    const {
      transport, appPrivateKey, appId, addressIndex, transaction
    } = signTxData;
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    const argument = await scriptUtilsEIP1559.getERC20Argument(
      transaction, tokenSignature, addressIndex
    );
    const script = params.EIP1559ERC20.scriptWithSignature;

    return ethSign.signEIP1559Transaction(
      signTxData,
      script,
      argument,
      publicKey,
    );
  }

  async signEIP1559Smart(
    signTxData: types.signEIP1559Tx
  ): Promise<string> {
    const {
      transport, appPrivateKey, appId, addressIndex, transaction
    } = signTxData;
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    const argument = await scriptUtilsEIP1559.getSmartArgument(
      transaction, addressIndex
    );
    const script = params.EIP1559SmartContract.scriptWithSignature;

    return ethSign.signEIP1559Transaction(
      signTxData,
      script,
      argument,
      publicKey,
    );
  }

  async signTransferTransaction(
    signTxData: types.signTx
  ): Promise<string> {
    const {
      transport, appPrivateKey, appId, addressIndex, transaction
    } = signTxData;
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    const argument = await scriptUtils.getTransferArgument(
      transaction, addressIndex
    );
    const script = params.TRANSFER.scriptWithSignature;

    return ethSign.signTransaction(
      signTxData,
      script,
      argument,
      publicKey,
    );
  }

  async signERC20Transaction(
    signTxData: types.signTx, tokenSignature = ''
  ): Promise<string> {
    const {
      transport, appPrivateKey, appId, addressIndex, transaction
    } = signTxData;
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    const argument = await scriptUtils.getERC20Argument(
      transaction, tokenSignature, addressIndex
    );
    const script = params.ERC20.scriptWithSignature;

    return ethSign.signTransaction(
      signTxData,
      script,
      argument,
      publicKey,
    );
  }

  async signSmartContractTransaction(
    signTxData: types.signTx
  ): Promise<string> {
    const {
      transport, appPrivateKey, appId, addressIndex, transaction
    } = signTxData;
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    const argument = await scriptUtils.getSmartContractArgument(
      transaction, addressIndex
    );
    const script = params.SmartContract.scriptWithSignature;

    return ethSign.signTransaction(
      signTxData,
      script,
      argument,
      publicKey,
    );
  }

  async signMessage(
    signMsgData: types.signMsg
  ): Promise<string> {
    await setting.auth.versionCheck(signMsgData.transport, 81);

    const {
      transport, appPrivateKey, appId, addressIndex, message
    } = signMsgData;
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    const argument = await scriptUtils.getSignMessageArgument(
      message, addressIndex
    );
    const script = params.SIGN_MESSAGE.scriptWithSignature;

    return ethSign.signMessage(
      signMsgData,
      script,
      argument,
      publicKey
    );
  }

  async signTypedData(
    typedData: types.signTyped
  ): Promise<string> {
    await setting.auth.versionCheck(typedData.transport, 84);

    const {
      transport, appPrivateKey, appId, addressIndex
    } = typedData;
    const publicKey = await this.getPublicKey(
      transport, appPrivateKey, appId, addressIndex
    );
    const script = params.SIGN_TYPED_DATA.scriptWithSignature;

    return ethSign.signTypedData(
      typedData,
      script,
      publicKey,
    );
  }
}
