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
        <form @submit.prevent="onSubmit" class="publish-form">
          <div class="form-group">
            <textarea class="form-control" id="new_reply" v-model="newReplyText" placeholder="Add a reply" style="width: 100%;"></textarea>
          </div>
          <button type="submit" class="btn-submit btn btn-dark mt-3">Add Reply</button>
        </form>
      </div>

      <!--
      <div class="comment-actions">
        <button @click="toggleLike">
          {{ comment.liked ? 'Unlike' : 'Like' }}
        </button>
      </div>
      -->
  
      <div class="comment-replies">
        <template v-if="comment.replies && comment.replies.length > 0">
          <Comment
            v-for="reply in comment.replies"
            :comment="reply"
            @toggle-like-reply="toggleLikeReply"
            :is-reply="true"
          />
        </template>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Comment',
    data() {
      return {
        newReplyText: '',
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
      formatDate(date) {
        return date.toDateString();
      },
      onSubmit() {
        
        if (this.newReplyText.trim() === '') {
          // Evitar agregar respuestas vacías
          return;
        }
        const newReply = {
          created_at: new Date(),
          content: this.newReplyText,
          replies: [], // No hay respuestas para la respuesta inicialmente
        };
  
        this.comment.replies.push(newReply);
        this.newReplyText = ''; // Limpiar el campo de entrada después de agregar una respuesta
      },
    /*
      toggleLike() {
        this.$emit('toggle-like', this.comment.id);
      },
    */
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
  