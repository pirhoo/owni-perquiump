var event = [];
	
function callDkEvent (id) {
	datas = event[id];
	$('overloader').empty();
	/*
	<object width="480" height="385">
	<param name="movie" value="http://www.youtube.com/v/d9oeXUC6FwQ?fs=1&amp;hl=fr_FR"></param>
	<param name="allowFullScreen" value="true"></param>
	<param name="allowscriptaccess" value="always"></param>
	<embed src="http://www.youtube.com/v/d9oeXUC6FwQ?fs=1&amp;hl=fr_FR" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed>
	</object>
	
	<iframe marginwidth="0" marginheight="0" width="546" height="229" frameborder="0" scrolling="no" src="http://www.dailymotion.com/videozap/playlist/x1eo7o_SuperSonia99_les-promesses-oubliees-de-sarko#videoId=x7jfsj?rows=3&auto=1&large=1"></iframe>
	*/
	h3	= new Element("h3", {"text":datas.title});
	
	alert(datas.type);
	switch (datas.type) {
		case 'videotext':
			html	= new Element("div", {"class":"ct_image","width":480,"height":385});
			htmlObject	= new Element("object", {"width":480,"height":385});
			htmlParam1	= new Element("param", {"name":"movie","value":datas.link});
			htmlParam2	= new Element("param", {"name":"allowFullScreen","value":"true"});
			htmlParam3	= new Element("param", {"name":"allowscriptaccess","value":"always"});
			htmlEmbed	= new Element("embed", {"src":datas.link,"type":"application/x-shockwave-flash","allowscriptaccess":"always","allowfullscreen":"true","width":480,"height":385});
			htmlText	= new Element("div", {"class":"ct_text","html":datas.comment});
			html		= new Element("div", {"class":"ct_full"});
			htmlParam1.inject(htmlObject);
			htmlParam2.inject(htmlObject);
			htmlParam3.inject(htmlObject);
			htmlEmbed.inject(htmlObject);
			htmlObject.inject(html);
			htmlText.inject(html);
			break;
		case 'video':
			htmlDivImg	= new Element("div", {"class":"ct_image","width":480,"height":385});
			htmlObject	= new Element("object", {"width":480,"height":385});
			htmlParam1	= new Element("param", {"name":"movie","value":datas.link});
			htmlParam2	= new Element("param", {"name":"allowFullScreen","value":"true"});
			htmlParam3	= new Element("param", {"name":"allowscriptaccess","value":"always"});
			htmlEmbed	= new Element("embed", {"src":datas.link,"type":"application/x-shockwave-flash","allowscriptaccess":"always","allowfullscreen":"true","width":480,"height":385});
			html		= new Element("div", {"class":"ct_video"});
			htmlParam1.inject(htmlObject);
			htmlParam2.inject(htmlObject);
			htmlParam3.inject(htmlObject);
			htmlEmbed.inject(htmlObject);
			htmlObject.inject(html);
			break;
		case 'frame':
			html = new Element("div", {"class":"ct_full"});
			htmlFrame = new Element("iframe", {"src":datas.link,"width":"100%","height":385,"marginwidth":"0","marginheight":"0","frameborder":"0","scrolling":"no"});
			htmlFrame.inject(html);
			break;
		case 'framedaily':
			html = new Element("div", {"class":"ct_full"});
			htmlFrame = new Element("iframe", {"src":datas.link,"width":"100%","height":385,"marginwidth":"0","marginheight":"0","frameborder":"0","scrolling":"no"});
			htmlFrame.inject(html);
			break;
		case 'text':
			html = new Element("div", {"class":"ct_full"});
			h3.inject(html);
			html.innerHTML+=datas.comment;
			break;
		case 'image':
			htmlDivImg	= new Element("div", {"class":"ct_image","width":480,"height":385});
			htmlImg	= new Element("img", {"src":datas.link,"width":480,"height":385});
			htmlText	= new Element("div", {"class":"ct_text"});
			htmlImg.inject(htmlDivImg);
			h3.inject(htmlText);
			htmlText.inject(htmlDivImg);
			htmlText.innerHTML+=datas.comment;
			htmlDivImg.inject(html);
			break;
		default:
			html = new Element("div", {"class":"ct_full"});
			h3.inject(html);
			html.innerHTML+=datas.comment;
			break;
	}
	
	htmlGlobal	= new Element("div", {"class":"ct_global"});
	breaker = new Element("span", {"class":"breaker","html":"&nbsp;"});
	closelnk = new Element("a", {"id":"closelnk","href":"javascript:;","html":"CONTINUER LA PERQUISITION X"});
	closelnk.inject(html);
	breaker.inject(html);
	html.inject(htmlGlobal);
	htmlGlobal.inject($('overloader'));
	
	$('closelnk').addEvent('click', function(e){
		e.stop();
		$('wrapper').fade('out');
	});
}
window.addEvent('domready', function() {

	
	/*
	var nfoSlide = new Fx.Slide('overloader', {mode: 'vertical'});
	nfoSlide.hide();
	
	$('step2').fade('out');
	
	$('step1').addEvent('click', function(e){
		e.stop();
		$('step2').setStyle('display', 'block').fade('in');
		this.fade('out');
	});
	*/
	$('wrapper').fade('out');
	
	var statsRequest = new Request.JSON({
		method: 'get',
		url: '/datas/prequisition.json', 
		link: 'cancel',
		noCache: true,
		autoCancel: true, 
		evalScripts: true,
		evalResponse: true,
		onRequest: function(html) {
		},
		onSuccess: function(json) {
			// alert(json.cheques.title);
			
			
			$each(json, function(prop, key) {
				// alert(key);	
				// alert(prop.title);
				objPerq = new Element("a", {"id":key,"class":"windowfy iconos","html":key+"<br />"});
				objPerq.inject($('step2'));
				event[key] = prop;
				
				$(key).addEvent('click', function(e){
					e.stop();
					$('wrapper').fade('in');
					callDkEvent (this.id);
					// nfoSlide.slideIn();
				});
			});
			
			
		},
		onFailure: function() {
			
		}
	});

	statsRequest.get();
});