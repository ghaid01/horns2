'use strict';

// function People (data) {this.name= data.name;
// }

// People.prototype.render = function(){
//     // $('ul').append(`
//     // <li>${this.name}</li>`)
//     let cloned = $('.person-template').clone();
//     cloned.removeClass('person-template');
//     cloned.find('span').text(this.name);
//     $('ul').append(cloned);


// };


// $('button').on('click', function(){
//     $('ul').fadeIn(900);
// });

// $('ul').on('click','li', function(){
//     console.log( $(this).text() );
// });


// $.get('data/page-1.json').then( data => { data.forEach( (value,idx) => {
//     let person = new People(value)
//     person.render();
// })
// });

// function Horns(data){
//     this.tittle = data.tittle; 
//     this.image = data.image_url;
//     // this.description = data.description;
// }

// Horns.prototype.render = function(){
// let cloned = $('.photo-template').clone();
// cloned.removeClass('phoro-template');
// cloned.text(this.image_url);

// };

// $.get('data/page-1.json').then( data => data.forEach( (value,idx) =>{
//     let horn = new Horns(value);
//     horn.render();
// })
// );

function Horns(data){
    this.image = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keywords= data.keyword;
    this.horns = data.horns;
    Horns.all.push(this);
}

Horns.all = [];

Horns.prototype.render = function(){
let output = $('<div></div>');
output.addClass(this.keywords);
let template = $('#photo-template').html();
output.html(template);
output.find('h2').text(this.title);
output.find('img').attr('src',this.image);
output.find('p').text(this.description);
$('main').append(output);
};

function populateSelectBox(){
    let seen = {};
    let select = $('select');
    Horns.all.forEach( (horn) => {
        if ( ! seen[horn.keywords]){
            // console.log(horn.keywords);
            let option = `<option value ="${horn.keywords}">${horn.keywords}</option>`
            select.append(option);
            seen[horn.keywords] = true;
     }

    });
    console.log(seen);
}

$('select').on('change', function(){
 let selected = ( $(this).val());
 $('div').hide();
 $(`.${selected}`).fadeIn(900);

});
$.get('data/page-1.json').then(data => { data.forEach( (thing) => {
let horn = new Horns(thing);
horn.render();
});
})
.then(() => populateSelectBox());
