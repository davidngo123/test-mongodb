import fetch from 'node-fetch';

import parser from 'node-html-parser';

async function getURLPreview(url){
    let inputUrl = url;
    try {
      let response = await fetch(inputUrl)
      let pageText = await response.text()
      let htmlPage = parser.parse(pageText)
      let metaTags = htmlPage.querySelectorAll('meta')
      let properties = {
          url : inputUrl,
          title : '',
          image : '',
          description : '',
          alt : ''
      }
      console.log(properties.url)
      for (let i = 0; i < metaTags.length; i++) {
          if (metaTags[i].rawAttributes.property == ('og:title')) {
              properties.title = metaTags[i].rawAttributes.content
          }
          if (metaTags[i].rawAttributes.property == ('og:image')) {
              properties.image = metaTags[i].rawAttributes.content
          }
          if (metaTags[i].rawAttributes.property == ('og:description')) {
              properties.description = metaTags[i].rawAttributes.content
          }
          if (metaTags[i].rawAttributes.property == ('og:image:alt')) {
            properties.alt = metaTags[i].rawAttributes.content
          }
          if (metaTags[i].rawAttributes.property == ('og:url')) {
            properties.url = metaTags[i].rawAttributes.content
          }
        }
  
        if (properties.url != '') {
          properties.url = '<a href="' + properties.url +  '">'
        } 
  
        if(properties.title != '') {
          properties.title = '<p><strong>' +  properties.title + '</strong></p>' 
        } else {
          
        }
  
        if (properties.image != '') {
          properties.image ='<img alt="' + properties.alt + '" src="' + properties.image + '" style="max-height: 200px; max-width: 270px;"> </a>'
        }
        if (properties.description != ''){
         properties.description = '<p>' + properties.description + '</p>'
        }
        let htmlOutput =  (
        '<div style="center max-width: 500px; border: solid 1px; padding: 3px; text-align: center;">' +
        properties.url + properties.title + 
        properties.image + properties.description + '</div>')
      
        return htmlOutput
    } catch(error) {
        return '<div style="center max-width: 500px; border: solid 1px; padding: 3px; text-align: center;"> There was a problem uploading your site.</div>'
    }
}

export default getURLPreview;