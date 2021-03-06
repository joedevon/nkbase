responseIn = context.sourceForResponse("arg:response");

mime = responseIn.getHeader("mime");
if (mime == "application/xml") {

	content = context.transrept(
	    responseIn.getRepresentation(),
	    org.w3c.dom.Document
	);

	//determine page title from XPath
	var pageTitleAttr;
	pageTitleAttr = org.netkernel.layer0.util.FastXPath.getSingleNode(
	    content,
	    "/*/@page-title"
	);

	if (pageTitleAttr) {
	    title = pageTitleAttr.getNodeValue();
	} else {
	    title = "Untitled!";
	}

	req = context.createRequest("active:xrl2");
	req.addArgument("template","res:/resources/template/global/master.xml");
	req.addArgumentByValue("title",title);
	req.addArgumentByValue("content",content);
	wrappedContent=context.issueRequestForResponse(req);
	responseOut=context.createResponseFrom(wrappedContent);
	responseOut.setMimeType("text/html");
} else {
	responseOut=context.createResponseFrom(responseIn);
}
