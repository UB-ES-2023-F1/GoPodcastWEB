<template>
    <div class="comment" :style="{ marginLeft: isReply ? '20px' : '0' }">
      <div class="comment-header">
        <span class="comment-username">{{ comment.user.username }}</span>
        <span class="comment-date">{{ comment.created_at }}</span>
      </div>
      <div class="comment-content">
        <p>{{ comment.content }}</p>
      </div>

      <div class="row">
        <form @submit.prevent="onSubmit" class="publish-form" v-if="!isReply">
          <div class="form-group">
            <textarea class="form-control" id="new_reply" v-model="newReplyText" placeholder="Add an answer..." style="width: 100%;" @keyup.enter="onSubmit"></textarea>
          </div>
          <button type="submit" class="btn-submit btn btn-dark mt-3">Reply</button>
        </form>
      </div>

      
  
      <div class="comment-replies">
        <template v-if="comment.replies && comment.replies.length > 0">
          <div v-for="reply in comment.replies" :key="reply.id" class="reply">
            <div class="comment-header">
              <span class="comment-username">{{ reply.user && reply.user.username }}</span>
              <span class="comment-date">{{ reply.created_at }}</span>
            </div>
            <div class="comment-content">
              <p>{{ reply.content }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'Comment',
    data() {
      return {
        newReplyText: '',
        user: {},
      };
    },
    props: {
      comment: {
        type: Object,
        required: true,
      },
      isReply: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      onSubmit() {
        if (this.newReplyText.trim() === '') {
          // Evitar agregar respuestas vacías
          return;
        }
        const newReply = {
          created_at: new Date().toDateString(),
          content: this.newReplyText,
          user: {
            id: this.user.id, // Reemplaza con el ID de usuario apropiado
            username: this.user.username, // Reemplaza con el nombre de usuario apropiado
          },
        };
        const episodeId = this.$route.params.id;
        const path = import.meta.env.VITE_API_URL + `/comments/${this.comment.id}/replies`

        const axiosConfig = {
          headers: { Authorization: 'Bearer ' + this.$store.state.access_token }
        }

        axios.post(path, newReply, axiosConfig).then((res) => {
          alert("Respuesta añadida con éxito!")
          this.comment.replies.push(res.data);
        })
        .catch((error) => {
          console.error(error)
          alert('Reply not submitted!')
        })
        
        //this.comment.replies.push(newReply);
        this.$emit('add-reply');
        
        this.newReplyText = '';
      },
      getUser(){
        const userPath = import.meta.env.VITE_API_URL + '/protected'

        const axiosConfig = {
          headers: { Authorization: 'Bearer ' + this.$store.state.access_token }
        }

        axios.get(userPath, axiosConfig).then((res) => {
          this.userId = res.data.logged_in_as;
          console.log("USER ID OF USER INCIAL CODE:",this.userId);
          const pathUser = import.meta.env.VITE_API_URL + `/user/${this.userId}`;
          console.log("PATH USER: ",pathUser)
          axios.get(pathUser).then((resUser) => {
            this.user = resUser.data;
            console.log(this.user)
          })
          .catch((error) => {
            console.error(error);
          });
        })
        .catch((error) => {
          console.error(error);
        });
      },
    },
    created() {
      this.getUser()
    },
  };
  </script>
  
  <style scoped>
  .comment {
    background-color: #333;
    border: 1px solid #a1a1a1;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 15px;
    margin: 15px 0;
    transition: background-color 0.3s ease;
    text-align: justify;
  }
  .reply {
    background-color: #333;
    border: 1px solid #a1a1a1;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 15px;
    margin: 15px 0;
    transition: background-color 0.3s ease;
    text-align: justify;
  }

  .btn-submit{
    font-size: 14px;
    padding: 0.1rem 1rem;  
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .comment-username {
    font-weight: bold;
    color: #bbb;
  }
  
  .comment-date {
    font-size: 0.8em;

    color: #888;
  }
  
  .comment-actions {
    margin-top: 10px;
  }
  
  .comment-replies {
    margin-top: 10px;
    padding-left: 20px;
  }
  
  .add-reply {
    margin-top: 10px;
  }
  .comment-content p {
    word-wrap: break-word;
  }
  </style>
  