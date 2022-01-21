function addLink() {
    const links = [
      {
        label:"Quiz Ninja Project - Updated Weekly",
        url:"quiz/index.html"
      },
      {
        label:"Week1 Notes",
        url:"week1/index.html"
      },
      {
        label:"Week2 Notes",
        url:"week2/index.html"
      },
      {
        label:"Week3 Notes",
        url:"week3/index.html"
      },
      {
        label:"Week3 Group Project 1",
        url:"week3/groupPart1.html"
      },
      {
        label:"Week3 Group Project 2",
        url:"week3/groupPart2.html"
      }
    ]
    for(var i = 0; i < links.length; i++) {
    	var label = links[i].label;
        var url = links[i].url;
    	var link = "<a href=\"" + url + "\">" + label + "</a>";
        $("#directoryOL").append( '<li>' + link + '</li>' )
    }
}