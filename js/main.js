

function addLink() {
    const links = [
      {
        label:"Week1 notes",
        url:"week1/index.html"
      },
      {
        label:"Week2 notes",
        url:"week2/index.html"
      }
    ]
    for(var i = 0; i < links.length; i++) {
    	var label = links[i].label;
      var url = links[i].url;
    	var link = "<a href=\"" + url + ">\"" + label + "\"</a>";
      const ol = document.querySelector("#directoryOL");
      const li = document.createElement('li');
      var text = document.createTextNode(link);
      li.appendChild(text);
      ol.appendChild(li);
		}


}