//  Copyright (c) 2020 Scarecrow Arts
//  http://www.scarecrowarts.com

var scriptPath = File($.fileName).parent.fsName;

var myPanel;
var label; 



function myScript(thisObj){
    function myScript_buildUI(thisObj){
        myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Easy Bake", undefined, {resizeable:false});

        res = "group\
            {\
            orientation:'column',\
            myButton1: Button{text:'Red'},\
            myButton2: Button{text:'Yellow'},\
            myButton3: Button{text:'Auqa'},\
            myButton4: Button{text:'Pink'},\
            myButton5: Button{text:'Lavender'},\
            myButton6: Button{text:'Peach'},\
            myButton7: Button{text:'Sea Foam'},\
            myButton8: Button{text:'Blue'},\
            myButton9: Button{text:'Green'},\
            myButton10: Button{text:'Purple'},\
            myButton11: Button{text:'Orange'},\
            myButton12: Button{text:'Brown'},\
            myButton13: Button{text:'Fuchsia'},\
            myButton14: Button{text:'Cyan'},\
            myButton15: Button{text:'Sandstone'},\
            myButton16: Button{text:'Dark Green'},\
            }";

        myPanel.grp = myPanel.add(res);


        myPanel.grp.myButton1.onClick =  onTabClicked;
        myPanel.grp.myButton2.onClick =  onTabClicked2;
        myPanel.grp.myButton3.onClick =  onTabClicked3;       
        myPanel.grp.myButton4.onClick =  onTabClicked4;      
        myPanel.grp.myButton5.onClick =  onTabClicked5;
        myPanel.grp.myButton6.onClick =  onTabClicked6;
        myPanel.grp.myButton7.onClick =  onTabClicked7;
        myPanel.grp.myButton8.onClick =  onTabClicked8;       
        myPanel.grp.myButton9.onClick =  onTabClicked9;      
        myPanel.grp.myButton10.onClick =  onTabClicked10;
        myPanel.grp.myButton11.onClick =  onTabClicked11;
        myPanel.grp.myButton12.onClick =  onTabClicked12;
        myPanel.grp.myButton13.onClick =  onTabClicked13;       
        myPanel.grp.myButton14.onClick =  onTabClicked14;
        myPanel.grp.myButton15.onClick =  onTabClicked15;
        myPanel.grp.myButton16.onClick =  onTabClicked16;
 



myPanel.layout.layout(true);

        return myPanel;
    }

//Yes, I made a function for every color. Please dont @ me
    function onTabClicked(){
        label = 1; 
        runMe(); 
    }
   
       function onTabClicked2(){
        label = 2; 
        runMe(); 
    }
    function onTabClicked3(){
        label = 3; 
        runMe(); 
    }
    function onTabClicked4(){
        label = 4; 
        runMe(); 
    }
    function onTabClicked5(){
        label = 5; 
        runMe(); 
    }
    function onTabClicked6(){
        label = 6; 
        runMe(); 
    }
    function onTabClicked7(){
        label = 7; 
        runMe(); 
    }
    function onTabClicked8(){
        label = 8; 
        runMe(); 
    }
    function onTabClicked9(){
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


    app.beginUndoGroup("Label ME!");


    for(b = 0; b < layerNum; b++){
                
        layer = app.project.activeItem.selectedLayers[b];
        layer.label = label; 
			
}



	myPanel.parent.show();
    myPanel.update();
	
    app.endUndoGroup();


    

}
myScript(this);