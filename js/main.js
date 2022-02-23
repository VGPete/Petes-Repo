function addLink() {
    const links = [
      {
        label:"Quiz Ninja Project",
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
        label:"Week4 Notes",
        url:"week4/index.html"
      },
      {
        label:"Week5 Notes",
        url:"week5/index.html"
      },
      {
        label:"Week6 Notes",
        url:"week6/index.html"
      },
      {
        label:"Week7 Notes",
        url:"week7/index.html"
      },
      {
        label:"Week8 Notes",
        url:"week8/index.html"
      },
    ]
    for(var i = 0; i < links.length; i++) {
    	var label = links[i].label;
        var url = links[i].url;
    	var link = "<a href=\"" + url + "\">" + label + "</a>";
        $("#directoryOL").append( '<li>' + link + '</li>' )
    }
}