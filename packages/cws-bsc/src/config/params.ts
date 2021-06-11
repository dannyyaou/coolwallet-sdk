export const COIN_TYPE = '8000003c'
export const CHAIN_ID = 56

export const TRANSFER = {
	script:
		'03000601C707000000003CCC0710C0C2ACD70032FFF8C2ACD7001EFFF6C2ACD70028FFF6CC071094CAA02700C2A2D700FFF6CC071080CC0E1038C2E09700CC07C0028080C3709710DC07C003425343DC07C003424e42CC0FC0023078BAA02F6C0E01DDF09700DAA2D7C0FFF612D207CC05065052455353425554546f4e',
	signature:
		'00304502200761E1215D2CC0057CB9A94D0927D8FC86329BBFFA7805423308D8470B95E78C0221009D66A4856F8A2B83A11B344DF500C04FB675541B67B5436B937C82B29E547BED'
};

export const BEP20 = {
	script:
		'03000601C707000000003CCC07C002F800C2ACD70034FFF8C2A5D700FFF6C2ACD7002AFFF6CC071094CAAC270045CC07C01380B844a9059cbb000000000000000000000000CAA02700CC07200000000000000000000000000000000000000000CAA2C7000CCC0E1038C2E09700CC07C0028080C37097C002DC07C00342534311ACC7CC3C1D04591507C004CC0F104012AC17C03D0401071507C002FF00B5AC17003DCAACBF003EDEF09700250F00CC0FC0023078BAA02F6C0E01DDF0970012AC17C03C0400141507C002FF00B5AC17003CDAA2C7B00CD207CC05065052455353425554546f4e',
	signature:
		'0030450221008885D574A4A76BB48B32D49B0EABF79D76D5536E6235DF63E19B2263AB168CDA0220350CDD28D9045C8C01FB5DDFE3A93EC7A0C5E417BF257784F84D2038EAAABC00'
};

export const BSCSmartContract = {
	script:
		'03000601C707000000003CCC07C002F800C2ACD70032FFF8C2ACD7001EFFF6C2ACD70028FFF6CC071094CAA02700C2A2D700FFF6C2AC97003ACC0E1038C2E09700CC07C0028080C37097C002DC07C003425343D207C005534d415254D207CC05065052455353425554546f4e',
	signature:
		'000030440220429DF67EB2A0D1ED5681F912FCCE313C457829D7A76123B59F427E94A2FD8B0A02204FCC18E46AB820323D2CA5ED52FCEAA5DFFF70A3BF2DC4D060E30CFDCAE08D99'
};

export const SIGN_MESSAGE = {
	script:
		'03000601C707000000003CCC07C01C19457468657265756D205369676E6564204D6573736167653A0A33325AA097C006DC07C003425343D207C0074d455353414745D207CC05065052455353425554546f4e',
	signature:
		'3046022100E04A601B491F3A5751E4D4D214B0B650D59F71343B91CAECD20819F9DDF8CD74022100FFE0E5909B033E8608856975307336903BC0E66674BE0AA1046C16024F71AA8F'
};

export const SIGN_TYPED_DATA = {
	script:
		'03000601C707000000003CCC07C0021901CAA057005AA597C006DC07C003425343D207CC0504545950454444415441D207CC05065052455353425554546f4e',
	signature:
		'003045022008935AF6BA11B9F720E59BE61AFF6F62A7A48FF2A39863AFD8B3920F355A1265022100E81EA86AC2FA3864CBC8773B10AF550B91F6A0E1FB68512DF32D8D35BC9FF3C8'
};
