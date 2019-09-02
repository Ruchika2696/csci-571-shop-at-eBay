const express = require('express');
const api_helper = require('./api_helper');
const app = express();

const port = 3000;


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});




app.get('/getAPIResponse', (req, res) => {
  api_helper.make_API_call('http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith='+req.query["curr"]+'&username=joshir&country=US&maxRows=5')
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.send(error)
  })
});



app.get('/getResultTable', (req, res) => {
  //url1 = req.query["url"];
  console.log("in server");
  //console.log("my keyword is" + req.query["keyword"]);
  console.log("my free is" + req.query["free"]);
  resultUrl = "";
  j = 1;
  k = 0;
  if (req.query["free"] == true) {
    resultUrl += "&itemFilter(" + j + ").name=FreeShippingOnly&itemFilter(" + j + ").value=true";
    j += 1;
  }
  if (req.query["local"] == true) {
    resultUrl += "&itemFilter(" + j + ").name=LocalPickupOnly&itemFilter(" + j + ").value=true";
    j += 1;
  }
  if (req.query["newone"] == true || req.query["used"] == true || req.query["unspecified"] == true) {
    resultUrl+="&itemFilter(" + j + ").name=Condition";

      if (req.query["newone"] == true) {
        resultUrl += "&itemFilter(" + j + ").value=New";
        
        k += 1;
      }
      if (req.query["used"] == true) {
        resultUrl += "&itemFilter(" + j + ").value=Used";
      
        k += 1;
      }
      if (req.query["unspecified"] == true) {
        resultUrl += "&itemFilter(" + j + ").value=Unspecified";
       
        k += 1;
      }
      j += 1;
  }
  if (req.query['category'] != undefined && req.query['category'] != null && req.query["category"] != -1) {
    resultUrl += "&itemFilter(" + j + ").name=categoryID&itemFilter(" + j + ").value="+req.query['category'];
    j += 1;
  }
  if (req.query['buyerPostalCode'] != null) {
    resultUrl += "&itemFilter(" + j + ").name=MaxDistance&itemFilter(" + j + ").value=" + (req.query['distance']) + "&buyerPostalCode=" + (req.query['buyerPostalCode']);
    j += 1;
  }
  console.log("https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=[YOUR_API_KEY]&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&RESTPAYLOAD&paginationInput.entriesPerPage=50&keywords=" + (req.query['keyword']) + "&itemFilter(0).name=HideDuplicateItems&itemFilter(0).value=true" + resultUrl + "&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo")
  api_helper.make_API_call("https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=[YOUR_API_KEY]&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&RESTPAYLOAD&paginationInput.entriesPerPage=50&keywords=" + (req.query['keyword']) + "&itemFilter(0).name=HideDuplicateItems&itemFilter(0).value=true" + resultUrl + "&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo")
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.send(error)
  })
});


app.get('/getProductDetail', (req, res) => {
  
  console.log("product detail url is");
  console.log('http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=[YOUR_API_KEY]&siteid=0&version=967&ItemID=' + req.query["id"] + '&IncludeSelector=Description,Details,ItemSpecifics');
  api_helper.make_API_call('http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=[YOUR_API_KEY]&siteid=0&version=967&ItemID='+req.query["id"]+'&IncludeSelector=Description,Details,ItemSpecifics')
		
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.send(error)
  })
});

app.get('/getProductPhotos', (req, res) => {

  api_helper.make_API_call("https://www.googleapis.com/customsearch/v1?q="+req.query['title']+"&cx=010101440887252859528:mqhkjnh0ymi&imgSize=huge&imgType=news&num=8&searchType=image&key=[YOUR_GOOGLE_API_KEY]")

  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.send(error)
  })
});

app.get('/getSimilarItems', (req, res) => {

  api_helper.make_similar_API_call('https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=[YOUR_API_KEY]&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=' + req.query["id"] + '&maxResults=20')

  .then(response => {
    res.json(JSON.parse(response))
  })
  .catch(error => {
    res.send(error)
  })
})




app.listen(port, () => console.log(`App listening on port ${port}!`))
