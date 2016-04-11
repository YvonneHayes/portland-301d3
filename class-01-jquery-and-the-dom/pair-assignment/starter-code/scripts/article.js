var articles = [];

function Article (articleIndex) {
    this.category = articleIndex.category;
    this.title = articleIndex.title;
    this.author = articleIndex.author;
    this.authorUrl = articleIndex.aurthurUrl;
    this.publishedOn = articleIndex.publishedOn;
    this.body = articleIndex.body
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();

  $newArticle.attr('data-category', this.category);

  $newArticle.find('#forArticle').text(this.title);
  $newArticle.find('address>a').text(this.author);
  $newArticle.find('address>href').text(this.authorUrl);
  $newArticle.find('.article-body').text(this.body);
  $newArticle.find('pubdate').text(this.publishedOn);


  // Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn)

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')

  $newArticle.append('<hr>');

  $newArticle.removeClass('template');

  return $newArticle;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
