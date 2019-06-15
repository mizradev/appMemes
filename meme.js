
class Post{
    constructor(titulo,img){
        this.img = img;
        this.titulo = titulo;
        this.comentarios = [];
        this.likes = 0;
    }

    addLikes(){
        this.likes += 1;
    }
    addComentario(usuario, comentario){
        this.comentarios.push({usuario, comentario});
    }
}

const arrayPosts = [];

const addPostsUI = () =>{
    limpiarDiv();
    const $posts = $('#posts');
    arrayPosts.forEach( (post) => { 
        $posts.append(`<div class="card col s6">
            <h5>${post.titulo}</h5>
            <img src="${post.img}" width="80%" alt="meme.js">
            <div class="row">
            <div class="col"> ${post.likes} likes ago </div>
            <div class="col"> 
            <a class="btn-sm waves-effect waves-light "><i class="material-icons">thumb_up</i></a>
                   </div>
            <div class="col">comentar</div>
            </div>
            <div class="row">
            <div class="col s6">
                <strong> 0 Comentarios</strong>
                <ul id="meme-comentario">
                <li></li>
                </ul>
            </div>
            </div>
        </div>`);
    });
    console.log(arrayPosts);
}

const limpiarDiv = ()=>{
    $('#posts').remove();
    $('#wrap').append('<div class="row" id="posts"> </div>');
}


const addPost = (e) =>{
    let meme_url = $('#meme-url');
    let meme_nombre = $('#meme-nombre');
    arrayPosts.push(new Post(meme_nombre.val(), meme_url.val()));
    addPostsUI();
    meme_nombre.val('');
    meme_url.val('');
    
    //implementando localstorage
    if(localStorage.getItem('MemesDB') === null){
        // crear memes en el localstorage si no los hay
        let memes = [];
        memes.push(new Post( meme_nombre.value, meme_url.value) );
        localStorage.setItem('MemesDB', JSON.stringify(memes));
    }else{
        // obtiene los memes del localStorage
        let memes = JSON.parse(localStorage.getItem('MemesDB'));
        memes.push(new Post(meme_nombre.value, meme_url.value));
        localStorage.setItem('MemesDB', JSON.stringify(memes));
    }
}

const getMemes = () =>{
    fetch('https://api.imgflip.com/get_memes')
        .then(res => {
            console.log(res);
            $('#posts').text(JSON.stringify(res));
        });    
}






