<template>
    <div class="comment-form">
      <form @submit.prevent="onSubmit" class="publish-form">
        <div class="form-group">
          <textarea class="form-control" v-model="newCommentText" placeholder="Add a comment" style="width: 100%;"></textarea>
        </div>
        <button type="submit" class="btn-submit btn btn-dark mt-3">Add Comment</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { useToast } from 'vue-toast-notification';

  export default {
    name: 'CommentForm',
    data() {
      return {
        newCommentText: '',
        episode:{},
        user:{},
        userId: '',
      };
    },
    methods: {
      onSubmit() {
        if (this.newCommentText.trim() === '') {
          // Evitar agregar comentarios vacíos
          return;
        }

        const newComment = {
          user: {
            id: this.userId,
            username: this.user.username,
          },
          created_at: new Date().toDateString(),
          content: this.newCommentText,
          replies: [],
        };
        

        const episodeId = this.$route.params.id;
        const path = import.meta.env.VITE_API_URL + `/episodes/${episodeId}/comments`

        const axiosConfig = {
          withCredentials: true
        }

        axios.post(path, newComment, axiosConfig).then((res) => {
          console.log("Comentario enviado con éxito!")
          this.episode.comments.push(res.data);

          const toast = useToast();
          toast.success('Comment submitted successfully!', { duration: 2000 });
        })
        .catch((error) => {
          console.error(error)
          alert('Comment not submitted!')
        })
        this.episode.comments.push(newComment);
        this.$emit('add-comment');
        
        this.newCommentText = '';
      },
      getEpisode(){
        const episodeId = this.$route.params.id;
        const pathEpisode = import.meta.env.VITE_API_URL + `/episodes/${episodeId}`;

        axios.get(pathEpisode).then((resEpisode) => {
            this.episode = JSON.parse(JSON.stringify(resEpisode.data));
            console.log(this.episode)
        })
        .catch((error) => {
            console.error(error);
        });
      },
      getUser(){
        const userPath = import.meta.env.VITE_API_URL + '/protected'

        const axiosConfig = {
          withCredentials: true
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
    mounted() {
      this.getEpisode()
      this.getUser()
    },
    
  };
</script>
  
  <style scoped>
  .comment-form {
    margin-top: 20px;
  }
  
  .btn-submit {
    font-size: 14px;
    padding: 0.1rem 1rem;
  }
  </style>
  