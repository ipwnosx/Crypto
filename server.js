var express = require('express');
var app = express();
var Web3 = require('web3');
var web3 = new Web3();
var url = require('url');

var abi = [{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],"name":"setPrices","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"mintedAmount","type":"uint256"}],"name":"mintToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
var tokensale_abi = [{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"deadline","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenReward","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fundingGoal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"amountRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"ifSuccessfulSendTo","type":"address"},{"name":"fundingGoalInEthers","type":"uint256"},{"name":"durationInMinutes","type":"uint256"},{"name":"etherCostOfEachToken","type":"uint256"},{"name":"addressOfTokenUsedAsReward","type":"address"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beneficiary","type":"address"},{"indexed":false,"name":"amountRaised","type":"uint256"}],"name":"GoalReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"backer","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"isContribution","type":"bool"}],"name":"FundTransfer","type":"event"}];
var dao_abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"description","type":"string"},{"name":"votingDeadline","type":"uint256"},{"name":"executed","type":"bool"},{"name":"proposalPassed","type":"bool"},{"name":"numberOfVotes","type":"uint256"},{"name":"currentResult","type":"int256"},{"name":"proposalHash","type":"bytes32"},{"name":"createdby","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getMembersCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"targetMember","type":"address"}],"name":"removeMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"executeProposal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"memberId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numProposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"member","type":"address"},{"name":"name","type":"string"},{"name":"memberSince","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"debatingPeriodInMinutes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenReward","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minimumQuorum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_token","type":"address"},{"name":"_extraData","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"majorityMargin","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"JobDescription","type":"string"},{"name":"transactionBytecode","type":"bytes"}],"name":"newProposal","outputs":[{"name":"proposalID","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"minimumQuorumForProposals","type":"uint256"},{"name":"minutesForDebate","type":"uint256"},{"name":"marginOfVotesForMajority","type":"int256"}],"name":"changeVotingRules","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getProposalCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"targetMember","type":"address"},{"name":"memberName","type":"string"}],"name":"addMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"supportsProposal","type":"bool"},{"name":"justificationText","type":"string"}],"name":"vote","outputs":[{"name":"voteID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"checkProposalCode","outputs":[{"name":"codeChecksOut","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"minimumQuorumForProposals","type":"uint256"},{"name":"minutesForDebate","type":"uint256"},{"name":"marginOfVotesForMajority","type":"int256"},{"name":"congressLeader","type":"address"},{"name":"addressOfTokenUsedAsReward","type":"address"}],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"ProposalAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"position","type":"bool"},{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"justification","type":"string"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"result","type":"int256"},{"indexed":false,"name":"quorum","type":"uint256"},{"indexed":false,"name":"active","type":"bool"}],"name":"ProposalTallied","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"member","type":"address"},{"indexed":false,"name":"isMember","type":"bool"}],"name":"MembershipChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"minimumQuorum","type":"uint256"},{"indexed":false,"name":"debatingPeriodInMinutes","type":"uint256"},{"indexed":false,"name":"majorityMargin","type":"int256"}],"name":"ChangeOfRules","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"truefalse","type":"bool"}],"name":"IsTrueFalse","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"receivedEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_token","type":"address"},{"indexed":false,"name":"_extraData","type":"bytes"}],"name":"receivedTokens","type":"event"}];

var provider = 'http://localhost:8545';

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

web3.setProvider(new web3.providers.HttpProvider(provider));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.post('/mint', function(req, res) {
    var contractAddress = req.body.tokenaddress;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	var tokenvalue = req.body.tokenvalue;

	if(tokenvalue!= '' && !isNaN(tokenvalue) && passphrase!='' && account!='' && contractAddress!=''){
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}
		
		var contract = web3.eth.contract(abi).at(contractAddress);
		var txHash = contract.mintToken(account,tokenvalue);
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});

app.post('/transfer', function(req, res) {
    var contractAddress = req.body.tokenaddress;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	var tokenvalue = req.body.tokenvalue;
	var addressto = req.body.addressto;

	if(addressto != '' && tokenvalue!= '' && !isNaN(tokenvalue) && passphrase!='' && account!='' && contractAddress!=''){
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}
		
		var contract = web3.eth.contract(abi).at(contractAddress);
		var txHash = contract.transfer(addressto,tokenvalue);
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});

app.post('/send', function(req, res) {
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	var value = req.body.value;
	var addressto = req.body.addressto;

	if(addressto != '' && value!= '' && !isNaN(value) && passphrase!='' && account!=''){
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}
				
		var txHash = web3.eth.sendTransaction({from: account, to: addressto, value: web3.toWei(value, 'ether')})
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});

app.post('/buy', function(req, res) {
    var contractAddress = req.body.token;
	var amount = req.body.amount;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	if(contractAddress != '' && !isNaN(amount) && account!=''&& passphrase!=''){
		var value = parseInt(web3.toWei(amount+'', 'ether'));
		console.log(value);
		try{
			var unlock = web3.personal.unlockAccount(account,passphrase);
		} catch (err) {
			res.end(JSON.stringify({error:err, msg:'invalid passphrase'}));
		}
		
		try{
			var contract = web3.eth.contract(abi).at(contractAddress);
			var txHash = contract.buy({value: value,from:account})
			
			res.end(JSON.stringify({txHash:txHash}));
		}catch(err){
			res.end(JSON.stringify({error:err,msg:'error buy function'}));
		}
		
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});

app.post('/sell', function(req, res) {
    var contractAddress = req.body.token;
	var amount = req.body.amount;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	if(contractAddress != '' && !isNaN(amount) && account!=''&& passphrase!=''){
		try{
			var unlock = web3.personal.unlockAccount(account,passphrase);
		} catch (err) {
			res.end(JSON.stringify({error:err, msg:'invalid passphrase'}));
		}
		
		try{
			var value = parseInt(amount);
			var contract = web3.eth.contract(abi).at(contractAddress);
			var txHash = contract.sell(value,{from:account});
			res.end(JSON.stringify({txHash:txHash}));
		}catch(err){
			res.end(JSON.stringify({error:err,msg:'error buy function'}));
		}
		
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});

app.post('/setPrices', function(req, res) {
    var contractAddress = req.body.token;
	var sellprice = req.body.sellprice;
	var buyprice = req.body.buyprice;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	if(contractAddress != '' && !isNaN(sellprice) && !isNaN(buyprice) && account!=''&& passphrase!=''){
		sellprice = web3.toWei(sellprice+'', 'ether');
		buyprice = web3.toWei(buyprice+'', 'ether');
		
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}
		
		var contract = web3.eth.contract(abi).at(contractAddress);
		var txHash = contract.setPrices(sellprice,buyprice);
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});


app.get('/getAccounts', function (req, res) {
	var accounts = web3.eth.accounts;
	res.end(JSON.stringify(accounts));
})

app.get('/getAccntEthBalance', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var balance = web3.fromWei(web3.eth.getBalance(address), 'ether').toNumber();
		res.end(JSON.stringify({address:address,balance:balance}));
	}else{
		res.end(JSON.stringify({error:'Passphrase required'}));
	}
})

app.get('/getTokenName', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var myTokenContract = web3.eth.contract(abi).at(address);		
		myTokenContract.name(function(err, result){
			res.end(JSON.stringify({address:myTokenContract.address,name:result}));
		})
		
	}else{
		res.end(JSON.stringify({error:'Passphrase required'}));
	}
})

app.get('/getTotalSupply', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var myTokenContract = web3.eth.contract(abi).at(address);
		myTokenContract.totalSupply(function(err, result){
			res.end(JSON.stringify({address:myTokenContract.address,totalSupply:result}));
		})
		
	}else{
		res.end(JSON.stringify({error:'Passphrase required'}));
	}
})

app.get('/getBalanceOf', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.token;
	var account = query.account;
	if(address!=''){
		var myTokenContract = web3.eth.contract(abi).at(address);		
		res.end(JSON.stringify({address:account,balance:myTokenContract.balanceOf(account)}));
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/getSellPrice', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var myTokenContract = web3.eth.contract(abi).at(address);		
		myTokenContract.sellPrice(function(err, result){
			res.end(JSON.stringify({address:address,result:result,sellPrice:web3.fromWei(result,'ether').toNumber()}));
		})
		
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/getBuyPrice', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var myTokenContract = web3.eth.contract(abi).at(address);		
		myTokenContract.buyPrice(function(err, result){
			res.end(JSON.stringify({address:address,result:result,buyPrice:web3.fromWei(result,'ether').toNumber()}));
		})
		
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/createAccount', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	if(query.passphrase!=''){
		web3.personal.newAccount(query.passphrase,function(error,result){
			if(!error){
				console.log(result);
				res.end(JSON.stringify({address:result}));
			}
		});
	}else{
		res.end(JSON.stringify({error:'Passphrase required'}));
	}
})

app.get('/getTransaction', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var txHash = query.txhash;
	if(txHash!=''){
		var tx = web3.eth.getTransaction(txHash);
		if (tx != null) {
			res.end(JSON.stringify({
				nonce:tx.nonce,
				blockHash:tx.blockHash,
				blockNumber:tx.blockNumber,
				transactionIndex:tx.transactionIndex,
				from:tx.from,
				to:tx.to,
				value:tx.value,
				gasPrice:tx.gasPrice,
				gas:tx.gas,
				input:tx.input
			}));
		}else{
			res.end(JSON.stringify({error:'Invalid txHash'}));
		}		
	}else{
		res.end(JSON.stringify({error:'Invalid txHash'}));
	}
})

app.get('/getBalances',function (req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	var contract = web3.eth.contract(abi).at(query.address);
	var symbol = contract.symbol();
	var rows = [];
	var i =1;
	
	
	var param = query.param;
	
	if(param!='' && param!=undefined){
		var address_param = param.split(',');
		for(var x=0;x<address_param.length;x++){
			var arr_address = address_param[x].split('-');
			var tmp_name = 'param '+x;
			if(arr_address.length>1){
				tmp_name = arr_address[1];
			}
			var p_address = arr_address[0]; 
			var address_param_token = contract.balanceOf(p_address);
			var address_param_ether = web3.fromWei(web3.eth.getBalance(p_address), "ether");		
			rows.push([i, p_address+' - '+tmp_name, address_param_token.toPrecision(10),address_param_ether.toFixed(18)]);
			i++;
		}
	}
	
	var tokens = contract.balanceOf(query.address);
	var ethers = web3.fromWei(web3.eth.getBalance(query.address), "ether");		
	
	rows.push([i, query.address+' - '+symbol, tokens.toPrecision(10),ethers.toFixed(18)]);
	i++;
	var owner = contract.owner();
	web3.eth.accounts.forEach( function(e){
		var tokens = contract.balanceOf(e);
		var ethers = web3.fromWei(web3.eth.getBalance(e), "ether");
		var addr =(owner == e) ? e+' - '+symbol+' '+'OWNER':e ;
		rows.push([i, addr, tokens,ethers]);	
		i++;
	})
	res.end(JSON.stringify({accounts:rows}));
})

//###########################TOKEN SALE#########################################################################
app.get('/getCheckGoalReached', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var tokensale = web3.eth.contract(tokensale_abi).at(address);		
		tokensale.getCheckGoalReached();
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})
app.get('/getDeadline', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var tokensale = web3.eth.contract(tokensale_abi).at(address);		
		tokensale.deadline(function(err, result){
			var date = new Date(result.c[0]*1000);
			var hours = date.getHours();
			var minutes = "0" + date.getMinutes();
			var seconds = "0" + date.getSeconds();
			var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

			res.end(JSON.stringify({address:address,result:result,hours:hours,minutes:minutes.substr(-2),seconds:seconds.substr(-2)}));
		});
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})
app.get('/getFundingGoal', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var tokensale = web3.eth.contract(tokensale_abi).at(address);		
		tokensale.fundingGoal(function(err, result){
			res.end(JSON.stringify({address:address,result:web3.fromWei(result,'ether').toNumber()}));
		})
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/getAmountRaised', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var tokensale = web3.eth.contract(tokensale_abi).at(address);		
		tokensale.amountRaised(function(err, result){
			res.end(JSON.stringify({address:address,result:web3.fromWei(result,'ether').toNumber()}));
		})
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})
//#################################################################################################################

//#################DAO#############################################################################################
app.get('/getProposalCount', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var dao = web3.eth.contract(dao_abi).at(address);		
		dao.getProposalCount(function(err, result){
			res.end(JSON.stringify({address:address,result:result}));
		})
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/getMinimumQuorum', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var dao = web3.eth.contract(dao_abi).at(address);		
		dao.minimumQuorum(function(err, result){
			res.end(JSON.stringify({address:address,result:result}));
		})
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/getMembersCount', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	if(address!=''){
		var dao = web3.eth.contract(dao_abi).at(address);		
		dao.getMembersCount(function(err, result){
			res.end(JSON.stringify({address:address,result:result}));
		})
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/getMember', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	var index = query.index;
	if(address!='' && !isNaN(index)){
		var dao = web3.eth.contract(dao_abi).at(address);		
		var result = dao.members(index);
		res.end(JSON.stringify({address:address,result:result}));
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/getProposal', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	var index = query.index;
	if(address!='' && !isNaN(index)){
		var dao = web3.eth.contract(dao_abi).at(address);		
		var result = dao.proposals(index);
		console.log(result);
		res.end(JSON.stringify({address:address,result:result,index:index}));
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.get('/checkProposalCode', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var address = query.address;
	
	var account = req.body.account;
	
	var index = query.index;
	var beneficiary = query.beneficiary;
	var ethamount = query.ethamount;
	var transactionBytecode = '';	
	
	if(address!='' && account!='' && index!='' && beneficiary!='' && ethamount!=''){
		var dao = web3.eth.contract(dao_abi).at(address);		
		var result = checkProposalCode(index, beneficiary, ethamount, transactionBytecode,{from:account})
		
		res.end(JSON.stringify({address:address,result:result}));
	}else{
		res.end(JSON.stringify({error:'Invalid address'}));
	}
})

app.post('/addMember', function(req, res) {
	var contractAddress = req.body.tokenaddress;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	var memberaddress = req.body.memberaddress;
	var membername = req.body.membername;

	if(membername != '' && memberaddress!= '' && passphrase!='' && account!='' && contractAddress!=''){
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}
		
		var dao = web3.eth.contract(dao_abi).at(contractAddress);
		var txHash = dao.addMember(memberaddress, membername,{from:account, gas: 4500000})
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});

app.post('/removeMember', function(req, res) {
	var contractAddress = req.body.tokenaddress;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	var memberaddress = req.body.memberaddress;

	if(memberaddress!= '' && passphrase!='' && account!='' && contractAddress!=''){
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}
		
		var dao = web3.eth.contract(dao_abi).at(contractAddress);
		var txHash = dao.removeMember(memberaddress, {from:account})
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});


app.post('/newProposal', function(req, res) {
	var contractAddress = req.body.tokenaddress;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	var beneficiary = req.body.beneficiary;
	var ethamount = req.body.ethamount;
	var description = req.body.description;
	var transactionBytecode = '';	

	if(beneficiary != '' && ethamount!= '' && passphrase!='' && account!='' && contractAddress!=''){
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}
		
		var dao = web3.eth.contract(dao_abi).at(contractAddress);
		var txHash = dao.newProposal(beneficiary,ethamount,description,transactionBytecode,{from:account,gas:4500000});
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});

app.post('/vote', function(req, res) {
	var contractAddress = req.body.tokenaddress;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	var proposalNumber = req.body.proposalnumber;
	var supportsProposal = req.body.supportsproposal;
	var justificationText = req.body.justificationtext;
	var transactionBytecode = '';	

	if(justificationText !='' && supportsProposal != '' && proposalNumber!= '' && passphrase!='' && account!='' && contractAddress!=''){
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}
		supportsProposal = supportsProposal==1?true:false;
		var dao = web3.eth.contract(dao_abi).at(contractAddress);
		var txHash = dao.vote(proposalNumber,supportsProposal,justificationText,{from:account});
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});

app.post('/executeProposal', function(req, res) {
	var contractAddress = req.body.tokenaddress;
	var account = req.body.account;
	var passphrase = req.body.passphrase;
	
	var proposalNumber = req.body.proposalnumber;
	var transactionBytecode = '';	

	if(proposalNumber!= '' && passphrase!='' && account!='' && contractAddress!=''){
		if(provider.indexOf('local')==-1){
			try{
				var unlock = web3.personal.unlockAccount(account,passphrase);
			} catch (err) {
				res.end(JSON.stringify({error:err}));
			}
		}

		var dao = web3.eth.contract(dao_abi).at(contractAddress);
		var txHash = dao.executeProposal(proposalNumber,transactionBytecode,{from:account});
		
		res.end(JSON.stringify({txHash:txHash}));
	}else{
		res.end(JSON.stringify({error:'Missing fields'}));
	}
});
//#################################################################################################################

app.get('/index',function (req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var fs = require('fs');
	var address = query.address;
	var param = query.param;
	
	if(address!=''){
		fs.readFile('./index.html', 'utf8', function (err, html) {
			if (err) throw err;   
			html = html.replace('{address}',address);
			if(param!=''&&param!=undefined){
				html = html.replace('{param}',param);
			}else{
				html = html.replace('{param}','');
			}
			
			res.writeHeader(200, {"Content-Type": "text/html"});
			res.end( html );
		});
	}
})

app.get('/tester',function (req, res){
	var fs = require('fs');
	fs.readFile('./tester.html', function (err, html) {
		if (err) throw err;   
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.end( html );
	});
})

app.get('/tokensale',function (req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var fs = require('fs');
	var address = query.address;
	var param = query.param;
	var tokensale = query.tokensale;
	
	if(address!='' && tokensale!=''){
		fs.readFile('./tokensale.html', 'utf8', function (err, html) {
			if (err) throw err;   
			html = html.replace('{address}',address);
			html = html.replace(new RegExp('{tokensale}', 'g'), tokensale);
			if(param!=''&&param!=undefined){
				html = html.replace('{param}',param);
			}else{
				html = html.replace('{param}','');
			}
			
			res.writeHeader(200, {"Content-Type": "text/html"});
			res.end( html );
		});
	}
})

app.get('/dao',function (req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var fs = require('fs');
	var address = query.address;
	var param = query.param;
	var dao = query.dao;
	
	if(address!='' && dao!=''){
		fs.readFile('./dao.html', 'utf8', function (err, html) {
			if (err) throw err;   
			html = html.replace('{address}',address);
			html = html.replace(new RegExp('{dao}', 'g'), dao);
			if(param!=''&&param!=undefined){
				html = html.replace('{param}',param);
			}else{
				html = html.replace('{param}','');
			}
			
			res.writeHeader(200, {"Content-Type": "text/html"});
			res.end( html );
		});
	}
})
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})