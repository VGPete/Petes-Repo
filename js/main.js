function addLink() {
    const links = [
      {
        label:"Week1 notes",
        url:"week1/index.html"
      },
      {
        label:"Week2 notes",
        url:"week2/index.html"
      },
      {
        label:"Week2 Group Project",
        url:"week2/groupCalculator.html"
      },
      {
        label:"Week3 notes",
        url:"week3/index.html"
      }
    ]
    for(var i = 0; i < links.length; i++) {
    	var label = links[i].label;
        var url = links[i].url;
    	var link = "<a href=\"" + url + "\">" + label + "</a>";
        $("#directoryOL").append( '<li>' + link + '</li>' )
    }
}