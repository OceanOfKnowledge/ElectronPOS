const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');

//Test print function
function handlePrint() {
  const { remote } = require('electron');
  const { BrowserWindow, dialog, shell } = remote;
  let printWindow = new BrowserWindow({ 'auto-hide-menu-bar': true,show:false });
  printWindow.loadURL("www.google.com");
  let list = printWindow.webContents.getPrinters();
  console.log("All printer available are ",list);
}


//Save text to file function
/* function saveToFile(filePath, text, heading=""){
  fs.access(filePath, function(err){
    if(!err){
      fs.appendFile(filePath, text, function(err){
        if(err){
          console.log(err);
        }
      });
    }else{
      //Add heading if it doesn't exist
      text = heading+ "\n" + text;
      fs.appendFile(filePath, text, function(err){
        if(err){
          console.log(err);
        }
      });
    }
  });
} */


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({

    //To use nodJS modules on client
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('index.html');

}
  //Test printer function
  
//Catch sales made
ipcMain.on('sales:made', function(e, sale){
  //Write sales to csv file
  var dateNow = new Date();
  var salesEntry = "";
  for(var i=0; i<sale.length; i++){
    salesEntry += sale[i].ID+","+
                  sale[i].item+","+
                  sale[i].quantity+","+
                  sale[i].amount+","+
                  dateNow.getDate()+"/"+
                  (dateNow.getMonth()+1)+"/"+
                  dateNow.getFullYear()+" "+
                  dateNow.getHours()+":"+
                  dateNow.getMinutes()+":"+
                  dateNow.getSeconds()+"\n";
  }

  saveToFile("./assets/files/sales.csv",salesEntry,"ID,Product Name,Quantity Sold,Amount,Date Time");
  
});


app.on('ready', createWindow)