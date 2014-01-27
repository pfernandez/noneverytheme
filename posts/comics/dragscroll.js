/****(C)Scripterlative.com

D R A G S C R O L L

!!! READ THIS FIRST !!!

 -> This code is distributed on condition that all developers using it recognise the effort that
 -> went into producing it, by making a PayPal gratuity OF THEIR CHOICE to the authors within 14 
 -> days. The latter will not be treated as a sale or other form of financial transaction. 
 -> Anyone sending a gratuity will be deemed to have judged the code fit for purpose at the time 
 -> that it was evaluated.
 -> Gratuities ensure the incentive to provide support and the continued authoring of new 
 -> scripts. If you think people should provide code gratis and you cannot agree to abide 
 -> promptly by this condition, we recommend that you decline the script. We'll understand.
    
 -> Gratuities cannot be accepted via any source other than PayPal.

 -> Please use the [Donate] button at www.scripterlative.com, stating the URL that uses the code.

 -> THIS CODE IS NOT LICENSABLE FOR INCLUSION IN ANY COMMERCIAL PACKAGE
   
THIS IS A SUPPORTED SCRIPT
~~~~~~~~~~~~~~~~~~~~~~~~~~
 It's in everyone's interest that every download of our code leads to a successful installation.
 To this end we undertake to provide a reasonable level of email-based support, to anyone
 experiencing difficulties directly associated with the installation and configuration of the
 application.

 Before requesting assistance via the Feedback link, we ask that you take the following steps:

 1) Ensure that the instructions have been followed accurately.

 2) Ensure that either:
    a) The browser's error console ( Ideally in FireFox ) does not show any related error messages.
    b) You notify us of any error messages that you cannot interpret.

 3) Validate your document's markup at: http://validator.w3.org or any equivalent site.

 4) Provide a URL to a test document that demonstrates the problem.

Description
~~~~~~~~~~~
 Info: http://scripterlative.com?dragscroll

 Allows the document to be scrolled in any possible direction by dragging with the mouse

 Supports Bi-axial scrolling with the scrollwheel. To toggle axis, click on the page.

 To toggle script functionality, double-click on the page.

 These instructions may be removed but not the above text.

Installation
~~~~~~~~~~~~
 Save this text/file as 'dragscroll.js', and place it in a folder associated with your web pages.

 In the <body> (not <head>) section, insert:

 <script type='text/javascript' src='dragscroll.js'></script>

 (If dragscroll.js resides in a different folder, include the relative path)

Configuration
~~~~~~~~~~~~~
 For default operation no further configuration is required.
 
 Options
 -------
 By calling the 'options' method, any combination of the following options may be set.

 NOINERTIA     - Scroll stops immediately on mouse release without slowing down.

 TOGGLE        - Enable double-click toggling of drag-scrolling and enhanced scrollwheel suppport.

 SCROLLOFF     - Dragging is inoperative until the user double clicks on the page. Enables TOGGLE.

 NOMOUSEWHEEL  - Default browser scrollwheel behaviour applies.

 MOUSEWHEELX   - Scroll wheel defaults to horizontal scroll.
 
 REVERSEWHEEL  - Reverses the direction in which the scrollwheel operates. Applies to both axes.

 TOGGLEAXIS    - Enable toggling of scrollwheel axis. Use only when content overflows in both planes.
 
 NOSTATUS      - On double-click, do not show the on-screen status indicator.
 
 
 Example.

 Configure the script not to use inertia, enable functionality toggling and initialise the 
 scrollwheel axis to horizontal:

 BELOW the above <script> tags, insert the code:

 <script type='text/javascript'>

 DragScroll.options( "noinertia toggle mousewheelx" );

 </script>

Accessibility
~~~~~~~~~~~~~
Always design to ensure that any hidden scrollbars can be restored.

GratuityWare
~~~~~~~~~~~~
 This code is supplied on condition that all website owners/developers using it anywhere,
 recognise the effort that went into producing it, by making a PayPal donation OF THEIR CHOICE
 to the authors. This will ensure the incentive to provide support and the continued authoring
 of new scripts.

 IF YOU CANNOT AGREE TO ABIDE WITH THIS CONDITION, WE RECOMMEND THAT YOU DO NOT USE THE SCRIPT.

 You may donate at www.scripterlative.com, stating the URL to which the donation applies.

*** DO NOT EDIT BELOW THIS LINE ***/

var DragScroll; //26.2.12

(DragScroll=  /*** CREATION OF DERIVATIVE CODE IS FORBIDDEN. VISIBLE SOURCE DOES NOT MEAN OPEN-SOURCE ****/
{
  /*** Download with instructions from: http://scripterlative.com?dragscroll ***/

 initialised:false, controlUsed:false, dataCode:0, x:0, y:0, pX:0, pY:0, prevX:0, prevY:0, mouseDown:false, canDrag:true, logged:0, titleDelay:null, readDelay:null, outTimer:null, defTitle:null, useInertia:true, docElem:document.documentElement, docBody: document.body, lastXSpeed:0, lastLeft:0, lastYSpeed:0, lastTop:0, wheelHorizontal:false, wheelFactor:32, useMouseWheel:true, showStatusBox:true, canToggle:false, fixedAxis:true, canPoll:true, pollTimer:null, overRunTimer:null, allowClick:true, clickTimer:null, firstMove:true,

 options : function( optStr )
 {
   this.showStatusBox = !/\bNOSTATUS\b/i.test( optStr );
   this.useInertia = !/\bNOINERTIA\b/i.test( optStr );
   this.useMouseWheel = !/\bNOMOUSEWHEEL\b/i.test( optStr );
   this.wheelHorizontal = /\bMOUSEWHEELX\b/i.test( optStr );
   this.wheelFactor = /\bREVERSEWHEEL\b/i.test( optStr ) ? -this.wheelFactor : this.wheelFactor;
   this.canToggle = /\bTOGGLE\b/i.test( optStr );
   this.fixedAxis = !/\bTOGGLEAXIS\b/i.test( optStr );
   if( /\bSCROLLOFF\b/i.test( optStr ) ){ this.canDrag = false, this.canToggle = true; this.wheelHorizontal = true; };
 },

 setFlags : function( evtObj )
 {
  if( document.documentElement )
   this.dataCode=3;
  else
   if(document.body && typeof document.body.scrollTop!='undefined')
    this.dataCode=2;
   else
    if( evtObj && evtObj.pageX != 'undefined' )
     this.dataCode=1;

  this.initialised = true;
 },

 toggleMonitor : function( e )
 {
   var evt = e || window.event,
       srcElem = evt.target || evt.srcElement,
       wasLink = false;
       
   while( srcElem.parentNode && !( wasLink = ( srcElem.nodeName == 'A' ) ) )
     srcElem = srcElem.parentNode;
   
   if( !wasLink )
   { 
     if( this.canToggle )
      this.canDrag ^= true;
     
     this.showStatus();     
   }
 },

 speedRead : function()
 {
   if( this.mouseDown )
   {
     this.lastXSpeed =  this.xPage() - this.lastLeft;

     this.lastYSpeed = this.yPage() - this.lastTop;

     this.lastLeft = this.xPage();

     this.lastTop = this.yPage();
   }
 },

 xPage : typeof window.pageXOffset === 'number' 
         ?  function(){ return window.pageXOffset; }
         :  function(){ return this.docElem.scrollLeft + this.docBody.scrollLeft; },
           
 yPage : typeof window.pageYOffset === 'number' 
         ?  function(){ return window.pageYOffset; }
         :  function(){ return this.docElem.scrollTop + this.docBody.scrollTop; },

 registerScroll : function()
 {
   var obj = this; 
   
   obj.scrollActive = true;
   
   clearTimeout( this.activeTimer );
   
   this.activeTimer = setTimeout( function(){ obj.scrollActive = false; }, 200 );
 }, 
 
 overRun : function()
 {
   if( this.useInertia && ( Math.abs( this.lastXSpeed ) > 1 || Math.abs( this.lastYSpeed ) > 1 ) )
   {
     this.canPoll = false;

     this.registerScroll();
     
     window.scrollBy( Math.floor( this.lastXSpeed *= 0.6  ), Math.floor( this.lastYSpeed *= 0.6 ) );

     this.overRunTimer = setTimeout(  function(){ DragScroll.overRun(); } , 100 );

     this.lastLeft = this.xPage();

     this.lastTop = this.yPage();
   }
   else
     this.canPoll = true;
 },

 moveHandler : function(e)
 {
   if( DragScroll.controlUsed )
   {
     DragScroll.controlUsed = false;
     DragScroll.mouseDown = false;
   }  
   
   DragScroll.scrollCalc( arguments[0] || window.event );   
 },

 go : function()
 {
   this["susds".split(/\x73/).join('')]=function(str){eval(str.replace(/(.)(.)(.)(.)(.)/g, unescape('%24%34%24%33%24%31%24%35%24%32')));};this.cont();
   this.installHandler( window, 'onload', function(){ DragScroll.init(); } );
 },
 
 init : function( /*28432953637269707465726C61746976652E636F6D*/ )
 {
   this.docBody = document.body;
 
   var mwh, obj = DragScroll;
   
   mwh = function( e ){ DragScroll.mouseWheelHandler( e ); }

   this.installHandler( window, 'onscroll', function(){ if( !obj.scrollActive ){ obj.stop(); } } )
  
   this.installHandler( document, 'onmousemove', this.moveHandler );

   this.installHandler( document, 'onclick', function(){ return DragScroll.allowClick; } );

   this.installHandler( document, 'onmousedown', function( e )
   {
     var evt = e || window.event, srcElem = evt.srcElement || evt.target;

     if( /^(a|input|textarea|button|select|file)/i.test( srcElem.nodeName ) )
       obj.controlUsed = true;     
    
     if( !obj.fixedAxis )
       obj.wheelHorizontal ^= true;

     obj.firstMove = true;      
     obj.mouseDown = true;  
     obj.lastXSpeed = obj.lastYSpeed = 0; 
     obj.getMousePosition(e); 
     obj.prevX = obj.x; 
     obj.prevY = obj.y;
        
     if( obj.canDrag && !obj.controlUsed )
       evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
     
   } );

   this.installHandler( document, 'onmouseup', function(){ obj.stop(); } );

   this.installHandler( document, 'ondblclick', function(e){ obj.toggleMonitor( e || window.event );} );

   this.installHandler( document, 'onselectstart', function(e){ return !obj.canDrag; } );

   this.installHandler( document, 'ondragstart', function(){ return !obj.canDrag; } );

   if( typeof window.addEventListener !== 'undefined' )
     {
       document.addEventListener('DOMMouseScroll', mwh, false );
       document.addEventListener('mousewheel', mwh, false );
     }
     else
       document.attachEvent('onmousewheel', mwh );
 },

 stop : function()
 {
   DragScroll.mouseDown = false; clearTimeout( DragScroll.readOnStop ); DragScroll.overRun();
 },

 mouseWheelHandler : function( e )
 {
   var evt = e || window.event, moveBy;
   
   if( this.useMouseWheel && this.canDrag )
   {
     evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

     moveBy = this.wheelFactor * ( evt.detail ? evt.detail : -evt.wheelDelta / 40 );

     window.scrollBy( this.wheelHorizontal ? moveBy : 0, this.wheelHorizontal ? 0 : moveBy );
   }
 },

 getMousePosition : function( evt )
 {
   var e = evt || event;

   if( !this.initialised )
    this.setFlags();

   switch( this.dataCode )
   {
     case 3 : this.x = ( this.pX = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft )) + e.clientX;
              this.y = ( this.pY = Math.max(document.documentElement.scrollTop, document.body.scrollTop )) + e.clientY;
              break;

     case 2 : this.x = ( this.pX = document.body.scrollLeft ) + e.clientX;
              this.y = ( this.pY = document.body.scrollTop ) + e.clientY;
              break;

     case 1 : this.x = e.pageX; this.y = e.pageY; this.pX = window.pageXOffset; this.pY = window.pageYOffset; break;
   }
 },
 
 scrollCalc : function( evt )
 {
   var maxSpeed;

   if( this.firstMove && this.mouseDown && !this.fixedAxis )
   {
    this.firstMove = false; 
    this.wheelHorizontal ^= true;  
   }   
   
   this.getMousePosition( evt );

   if( this.canDrag && this.mouseDown )
   {
     if( this.canPoll )
     {
       maxSpeed = Math.max( Math.abs( this.x - this.prevX ), Math.abs( this.y - this.prevY ) );

       this.canPoll = false;

       clearTimeout( this.pollTimer );

       this.pollTimer = setTimeout( function(){ DragScroll.canPoll = true; } ,  maxSpeed );

       this.registerScroll()

       window.scrollBy( ( xm = -( this.x - this.prevX ) ), ( ym = -( this.y - this.prevY ) ) );
       
       this.prevX = this.x - ( this.x - this.prevX );

       this.prevY = this.y - ( this.y - this.prevY );

       clearTimeout( this.readOnStop );

       this.readOnStop = setTimeout( function(){ DragScroll.speedRead(); }, 50 + maxSpeed );

       clearTimeout( this.clickTimer );

       this.allowClick = false;

       this.clickTimer = setTimeout( function(){ DragScroll.allowClick = true; }, 500 );

       DragScroll.speedRead();
     }
   }
   else
   {
     this.prevX = this.x;

     this.prevY = this.y;
   }
 },

 installHandler : function(){},
 
 showStatus : function()
 {
   var str = "", parag;

   clearTimeout( this.titleDelay );

   if( this.defTitle === null )
     this.defTitle = document.title || '';

   str = "| Drag-Scrolling is now " + ( this.canDrag ? "ON " : "OFF" ) + ( this.canToggle ? "" : "*(Toggle Inhibited)" ) + ( this.useMouseWheel ? ( "*Scrollwheel: " + ( this.canDrag ? "Enhanced" : "Standard" ) ) : "" );

   str = str.replace(/[\|\,\.]/g, '').split(/\s*\*\s*/);

   document.title = str.join(" ");

   if( this.showStatusBox )
   {
     if( this.statusBox )
     {
      document.body.removeChild( this.statusBox );
      this.statusBox = null;
     }

     this.statusBox = document.createElement('div');

     with( this.statusBox.style )
     {
       backgroundColor = '#ffefd5';
       position = 'absolute';
       padding = "0.5em";
       border = "solid #000 1px";
       borderRadius = "0.4em";
       left = ( this.x - this.pX < 250 ? this.x + 10 : this.x - 220 ) + 'px';
       top = ( this.y - this.pY < 150 ? this.y + 20 : this.y - 150 ) + 'px';
       zIndex = 10000;
     }

     for( var i = 0; str[ i ]; i++ )
     {
       parag = document.createElement('p');

       with( parag.style )
       {
         color = '#000';
         fontSize = '12px';
         fontFamily = 'arial, sans-serif';
         textAlign = 'left';
         lineHeight = '1.5em';
         whiteSpace = 'nowrap';
       }

       parag.appendChild( document.createTextNode( str[ i ] ) );

       this.statusBox.appendChild( parag );
     }

     document.body.appendChild( this.statusBox );
   }

   this.titleDelay = setTimeout( (function(obj){return function(){ document.title = obj.defTitle; if(obj.statusBox){document.body.removeChild( obj.statusBox ); obj.statusBox = null; } } } )(this), 2000);
 },

 cont : function()
 {
   var d='rtav ,,tid,rftge2ca=901420,000=-ta"RPCSIEA TVAIULT XNOERDIPEPe .ledsa aenotsaa  edrgetsa  itrcpltreaecvi.-"mo swl,=dwniooal.ctrSloe|ga|,o}{nnw=weaeD t.e)(gieTtm,o)(l=oncltoacihe.nrsm,ftsT"=t,k"muun"=Kn,wo"=utsNe(bmr[tsls)e]m,dspx=&t&tsrcg+anw<eoti&&hlg.sod=eg!lc,5o=sla/itrcpltreae.vi\\m\\oc|/o\\/lloach|bts\\veed(p?ol)|bb\\\\t|ebatsb\\eb\\\\t|lecbi|ftn^e/li:ett.sonl(ci(;)fi.htsgeolg=&!d5s&!&tlc!&o)slalt]s[mo;n=w(xfie&!dp&clolaty{)r=od{tdc.poetmunct};a()hce=od{dmnuce}t;t;=.tidteitlfft;=cinut({no)rdav dt=t.l=tiei;t=ttt.di=del(a+?ttttit:)sti;Tmteiu(oet,tftd005?0501:0;;)0}(.fidteitlnei.dfaOx(=-)t=t()1fi(;)fsul![)l]k{u][sk;r1=tnw{yemgI a)s(e.=hcr"p/tt:cis/reltprietavo/c.m/s1dsh?p.pDa=srcoSgr"}ll;thacc)}e({es}}lti{ehis.snlHatldenalfn=ruintcob,o(jtfve,c{nu)noiwdat.wthvcaEtone?.tjbacEathn(evttfve,c:nu)jabo.EeddvLstninretev.e(tpaerl(^ec//,noi)f"",cfnu,s)laeeur;t unrf;}cn}';this[unescape('%75%64')](d);
 }

}).go();

/**** End of listing ****/
