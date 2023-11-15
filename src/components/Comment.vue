<template>
    <div class="comment" :style="{ marginLeft: isReply ? '20px' : '0' }">
      <div class="comment-header">
        <span class="comment-author">{{ comment.author }}</span>
        <span class="comment-date">{{ formatDate(comment.date) }}</span>
      </div>
      <div class="comment-content">
        <p>{{ comment.text }}</p>
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
            :key="reply.id"
            :comment="reply"
            @toggle-like-reply="toggleLikeReply"
            :is-reply="true"
          />
        </template>

    <!--
        <div class="add-reply">
          <textarea v-model="newReplyText" placeholder="Add a reply"></textarea>
          <button @click="addReply">Add Reply</button>
        </div>
    -->

      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Comment',
    data() {
      return {
        // newReplyText: '',
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
    /*
      toggleLike() {
        this.$emit('toggle-like', this.comment.id);
      },
    */
    /*
      addReply() {
        const newReply = {
          id: generateUniqueId(),
          author: 'User', // Puedes reemplazar 'User' con los datos reales del usuario
          date: new Date(),
          text: this.newReplyText,
          liked: false,
          replies: [], // No hay respuestas para la respuesta inicialmente
        };
  
        this.comment.replies.push(newReply);
        this.newReplyText = ''; // Limpiar el campo de entrada después de agregar una respuesta
      },
    */
    },
  };
  </script>
  
  <style scoped>
  .comment {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .comment-author {
    font-weight: bold;
  }
  
  .comment-date {
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
  </style>
  