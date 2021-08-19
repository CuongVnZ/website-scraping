const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

// Async function which scrapes the data
async function getAvgValue(name) {
  try {
    const url = `https://www.stockbiz.vn/Stocks/${name}/Overview.aspx`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("#stockAvgVolume10d .value");
    listItems.each((idx, el) => {
      console.log($(el).text().trim());
    });

  } catch (err) {
    console.error(err);
  }
}

// Invoke the above function
getAvgValue("SSI");
getAvgValue("VNM");
getAvgValue("NTL");
getAvgValue("VIC");
getAvgValue("AAA");