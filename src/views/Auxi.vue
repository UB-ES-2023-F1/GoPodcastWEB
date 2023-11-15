<template>
  <div class="login">
    <h1>Artículo</h1>
    <p>Contenido del artículo.</p>

    <div class="add-comment">
      <textarea v-model="newCommentText" placeholder="Add a comment"></textarea>
      <button @click="addComment">Add Comment</button>
    </div>

    <Comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @toggle-like="toggleLike"
    />
  </div>
</template>

<script>
import Comment from '../components/Comment.vue';

export default {
  components: {
    Comment,
  },
  data() {
    return {
      comments: [
        {
          id: "p5jg9d8k",
          author: 'User1',
          date: new Date(),
          text: "Comentario Prueba1",
          liked: false,
          replies: [
            {
              id: "p5jg9d81",
              author: 'User2',
              date: new Date(),
              text: "Comentario Prueba Res1",
              liked: false,
              replies: [
                {
                  id: "p5jg9d71",
                  author: 'User2',
                  date: new Date(),
                  text: "Comentario Prueba Res1Res1",
                  liked: false,
                  replies: [],
                },
              ],
            },
            {
              id: "p5jg9d31",
              author: 'User3',
              date: new Date(),
              text: "Comentario Prueba Res2",
              liked: false,
              replies: [],
            },
          ],
        },
        {
          id: "p5jg9d30",
          author: 'User3',
          date: new Date(),
          text: "Comentario Prueba 2",
          liked: false,
          replies: [],
        },
      ],
      newCommentText: '',
    };
  },
  methods: {
    toggleLike(commentId) {
      // Implementa la lógica para cambiar el estado "liked" del comentario
      // Puedes usar axios u otro método para enviar esta información al servidor
    },
    addComment() {
      const newComment = {
        id: generateUniqueId(),
        author: 'User',
        date: new Date(),
        text: this.newCommentText,
        liked: false,
        replies: [],
      };

      this.comments.push(newComment);
      this.newCommentText = '';
    },
  },
};
</script>

<style scoped>
.add-comment {
  margin-top: 20px;
}
</style>
