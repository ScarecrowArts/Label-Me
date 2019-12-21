//  Copyright (c) 2020 Scarecrow Arts
//  http://www.scarecrowarts.com
//  Version 0.01

//NOT WORTH $19 USD THAT'S FOR SURE

var scriptPath = File($.fileName).parent.fsName;
var myPanel;
var label; 

function myScript(thisObj){
    function myScript_buildUI(thisObj){
        myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "labelME", [100, 100, 12, 560], {resizeable:false});
        
        var img00 = scriptPath + "/labelME/none.png"
        var img01 = scriptPath + "/labelME/red.png"
        var img02 = scriptPath + "/labelME/yellow.png"
        var img03 = scriptPath + "/labelME/aqua.png"
        var img04 = scriptPath + "/labelME/pink.png"
        var img05 = scriptPath + "/labelME/lavender.png"
        var img06 = scriptPath + "/labelME/peach.png"
        var img07 = scriptPath + "/labelME/seafoam.png"
        var img08 = scriptPath + "/labelME/blue.png"
        var img09 = scriptPath + "/labelME/green.png"
        var img10 = scriptPath + "/labelME/purple.png"
        var img11 = scriptPath + "/labelME/orange.png"
        var img12 = scriptPath + "/labelME/brown.png"
        var img13 = scriptPath + "/labelME/fuchsia.png"
        var img14 = scriptPath + "/labelME/cyan.png"
        var img15 = scriptPath + "/labelME/sandstone.png"
        var img16 = scriptPath + "/labelME/darkgreen.png"

        res = "group\{\orientation:'column',\}";

        myPanel.grp = myPanel.add(res);
        
        //INITIALIZE BUTTONS
        var button00 = myPanel.grp.add("iconbutton", undefined, img00, {style:'toolbutton'}, "button00")
        var button01 = myPanel.grp.add("iconbutton", undefined, img01, {style:'toolbutton'}, "button01")
        var button02 = myPanel.grp.add("iconbutton", undefined, img02, {style:'toolbutton'}, "button02")
        var button03 = myPanel.grp.add("iconbutton", undefined, img03, {style:'toolbutton'}, "button03")
        var button04 = myPanel.grp.add("iconbutton", undefined, img04, {style:'toolbutton'}, "button04")
        var button05 = myPanel.grp.add("iconbutton", undefined, img05, {style:'toolbutton'}, "button05")
        var button06 = myPanel.grp.add("iconbutton", undefined, img06, {style:'toolbutton'}, "button06")
        var button07 = myPanel.grp.add("iconbutton", undefined, img07, {style:'toolbutton'}, "button07")
        var button08 = myPanel.grp.add("iconbutton", undefined, img08, {style:'toolbutton'}, "button08")
        var button09 = myPanel.grp.add("iconbutton", undefined, img09, {style:'toolbutton'}, "button09")
        var button10 = myPanel.grp.add("iconbutton", undefined, img10, {style:'toolbutton'}, "button10")
        var button11 = myPanel.grp.add("iconbutton", undefined, img11, {style:'toolbutton'}, "button11")
        var button12 = myPanel.grp.add("iconbutton", undefined, img12, {style:'toolbutton'}, "button12")
        var button13 = myPanel.grp.add("iconbutton", undefined, img13, {style:'toolbutton'}, "button13")
        var button14 = myPanel.grp.add("iconbutton", undefined, img14, {style:'toolbutton'}, "button14")
        var button15 = myPanel.grp.add("iconbutton", undefined, img15, {style:'toolbutton'}, "button15")
        var button16 = myPanel.grp.add("iconbutton", undefined, img16, {style:'toolbutton'}, "button16")
        
        myPanel.margins = 0;
        myPanel.grp.margins = 0;
        myPanel.grp.margins.top = 0;
        myPanel.grp.margins.bottom = 0;
        myPanel.grp.margins.left = 0;
        myPanel.grp.margins.right = 0;
        myPanel.grp.spacing = 0;
        myPanel.grp.spacing.top = 0;
        myPanel.grp.spacing.bottom = 0;
        myPanel.grp.spacing.left = 0;
        myPanel.grp.spacing.right = 0;
        
        //TOOL TIPS
        button00.helpTip = "None";
        button01.helpTip = "Red";
        button02.helpTip = "Yellow";
        button03.helpTip = "Aqua";
        button04.helpTip = "Pink";
        button05.helpTip = "Lavender";
        button06.helpTip = "Peach";
        button07.helpTip = "Sea Foam";
        button08.helpTip = "Blue";
        button09.helpTip = "Green";
        button10.helpTip = "Purple";
        button11.helpTip = "Orange";
        button12.helpTip = "Brown";
        button13.helpTip = "Fuchsia";
        button14.helpTip = "Cyan";
        button15.helpTip = "Sandstone";
        button16.helpTip = "Dark Green";

        //DO THE THING
        button00.onClick =  onTabClicked00;
        button01.onClick =  onTabClicked01;
        button02.onClick =  onTabClicked02;
        button03.onClick =  onTabClicked03;       
        button04.onClick =  onTabClicked04;      
        button05.onClick =  onTabClicked05;
        button06.onClick =  onTabClicked06;
        button07.onClick =  onTabClicked07;
        button08.onClick =  onTabClicked08;       
        button09.onClick =  onTabClicked09;      
        button10.onClick =  onTabClicked10;
        button11.onClick =  onTabClicked11;
        button12.onClick =  onTabClicked12;
        button13.onClick =  onTabClicked13;       
        button14.onClick =  onTabClicked14;
        button15.onClick =  onTabClicked15;
        button16.onClick =  onTabClicked16;

        myPanel.layout.layout(true);
        return myPanel;
    }

    //Yes, I made a function for every color. Please dont @ me
    function onTabClicked00(){
        label = 0;
        runMe(); 
    }

    function onTabClicked01(){
        label = 1; 
        runMe(); 
    }
   
    function onTabClicked02(){
        label = 2; 
        runMe(); 
    }

    function onTabClicked03(){
        label = 3; 
        runMe(); 
    }

    function onTabClicked04(){
        label = 4; 
        runMe(); 
    }

    function onTabClicked05(){
        label = 5; 
        runMe(); 
    }

    function onTabClicked06(){
        label = 6; 
        runMe(); 
    }

    function onTabClicked07(){
        label = 7; 
        runMe(); 
    }

    function onTabClicked08(){
        label = 8; 
        runMe(); 
    }

    function onTabClicked09(){
        label = 9; 
        runMe(); 
    }

    function onTabClicked10(){
        label = 10; 
        runMe(); 
    }

    function onTabClicked11(){
        label = 11; 
        runMe(); 
    }

    function onTabClicked12(){
        label = 12; 
        runMe(); 
    }

    function onTabClicked13(){
        label = 13; 
        runMe(); 
    }

    function onTabClicked14(){
        label = 14; 
        runMe(); 
    }

    function onTabClicked15(){
        label = 15; 
        runMe(); 
    }

    function onTabClicked16(){
        label = 16; 
        runMe(); 
    }

    var myScriptPal = myScript_buildUI(thisObj);

    if (myScriptPal != null && myScriptPal instanceof Window){
        myScriptPal.center();
        myScriptPal.show();
    }
}

function runMe(){
    var layerNum = app.project.activeItem.selectedLayers.length; 
    var comp=app.project.activeItem;   

    app.beginUndoGroup("labelME");

    for(b = 0; b < layerNum; b++){             
        layer = app.project.activeItem.selectedLayers[b];
        layer.label = label; 
    }

	myPanel.parent.show();
    myPanel.update();
	
    app.endUndoGroup();
}
myScript(this);

