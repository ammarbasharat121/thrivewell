(function(){

	var en = {};

	en.dependencies = [{"conditions":[{"condition":"AND","target":"field:768606","comparator":"==","value":"Ongoing Monthly"}],"actions":[{"type":"altlist","target":768607,"altlist":"alt1"}]},{"conditions":[{"condition":"AND","target":"field:768606","comparator":"==","value":"One Time"}],"actions":[{"type":"altlist","target":768607,"altlist":"alt0"}]},{"conditions":[{"condition":"AND","target":"field:768586","comparator":"==","value":"Y"}],"actions":[{"type":"showHide","display":"Show","target":"field:768595"}]},{"conditions":[{"condition":"AND","target":"field:768586","comparator":"==","value":"Y"}],"actions":[{"type":"showHide","display":"Show","target":"field:768596"}]},{"conditions":[{"condition":"AND","target":"field:768585","comparator":"==","value":"Y"}],"actions":[{"type":"showHide","display":"Show","target":"field:768591"}]},{"conditions":[{"condition":"AND","target":"field:768593","comparator":"==","value":"Y"}],"actions":[{"type":"showHide","display":"Show","target":"field:768602"}]},{"conditions":[{"condition":"AND","target":"field:768607","comparator":"","value":""}],"actions":[{"type":"calculate","target":"field:768608","stack":[{"type":"variable","value":"field:768607","label":"Amount"},{"type":"operator","value":"*"},{"type":"constant","value":"1"}]}]}];

	en.altLists = [{"id":768607,"data":[{"name":"alt0","data":[{"selected":false,"value":"1000","label":"$1000","forId":"","imageUrl":""},{"selected":false,"value":"500","label":"$500","forId":"","imageUrl":""},{"selected":false,"value":"250","label":"$250","forId":"","imageUrl":""},{"selected":true,"value":"125","label":"$125","forId":"","imageUrl":""},{"selected":false,"value":"50","label":"$50","forId":"","imageUrl":""},{"selected":false,"value":"Other","label":"Other","forId":"","imageUrl":""}]},{"name":"alt1","data":[{"selected":false,"value":"100","label":"$100/mth","forId":"","imageUrl":""},{"selected":true,"value":"50","label":"$50/mth","forId":"","imageUrl":""},{"selected":false,"value":"30","label":"$30/mth","forId":"","imageUrl":""},{"selected":false,"value":"20","label":"$20/mth","forId":"","imageUrl":""},{"selected":false,"value":"10","label":"$10/mth","forId":"","imageUrl":""},{"selected":false,"value":"Other","label":"Other/mth","forId":"","imageUrl":""}]}]}];

	en.validators = [{"componentId":142682,"type":"REQ","format":"","errorMessage":"Expiration Date is required."},{"componentId":768605,"type":"REQ","format":"","errorMessage":"captcha is required."},{"componentId":768606,"type":"REQ","format":"","errorMessage":"Donation type is required."},{"componentId":768575,"type":"REQ","format":"","errorMessage":"Last Name is required."},{"componentId":768577,"type":"REQ","format":"","errorMessage":"Address Type is required."},{"componentId":768589,"type":"REQ","format":"","errorMessage":"Telephone is required."},{"componentId":768583,"type":"REQ","format":"","errorMessage":"City is required."},{"componentId":768600,"type":"REQ","format":"","errorMessage":"Credit Card Number is required."},{"componentId":768584,"type":"REQ","format":"","errorMessage":"Province / State is required."},{"componentId":768607,"type":"AMNT","format":"5~","errorMessage":"Minimum donation amount is $5"},{"componentId":768588,"type":"EMAL","format":null,"errorMessage":"This is a required email field"},{"componentId":768598,"type":"REQ","format":"","errorMessage":"Cause is required."},{"componentId":768599,"type":"REQ","format":"","errorMessage":"CVV is required."},{"componentId":768580,"type":"REQ","format":"","errorMessage":"First Name is required."},{"componentId":768581,"type":"REQ","format":"","errorMessage":"Postal Code is required."},{"componentId":768582,"type":"REQ","format":"","errorMessage":"Address 1 is required."},{"componentId":768587,"type":"REQ","format":"","errorMessage":"Country is required."},{"componentId":768590,"type":"CUST","format":"^[a-zA-Z'`~.-]+( [a-zA-Z'`~.-]+)*\\s*$","errorMessage":"Please check your Cardholder name."}];

	en.alerts = [{"type":"MFE","content":"is required."},{"type":"GPE","content":"This transaction has failed as there has been an error in processing your payment."},{"type":"CIA","content":"Please re-enter the captcha"},{"type":"CCCN","content":"Please check that the credit card number entered is correct."},{"type":"CCVV","content":"Please check the security code on your card and try again."}];

	en.premiumGifts = {};

    en.paymentGateways = [];

    en.vault = {"environment":"live","routeId":"f5c535c1-68ab-4f33-8337-4aadc1d1123f","vaultId":"tntcfxdwyzh"};

    en.feeCover = {};

    en.upsell = [];

	window.EngagingNetworks = en;

})()