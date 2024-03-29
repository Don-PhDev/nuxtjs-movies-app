<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else class="container single-movie">
    <NuxtLink class="button" :to="{name: 'index'}">Back</NuxtLink>
    <div class="movie-info">
      <div class="movie-img">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
        />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.title }}</h1>
        <p v-if="movie.tagline !== ''" class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p v-if="movie.genres !== 'undefined'" class="movie-fact">
          <span>Genres:</span> {{ wordsFormatter.format(movieGenres) }}
        </p>
        <p class="movie-fact">
          <span>Released:</span> {{ dateFormat }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p v-if="movie.revenue !== 0" class="movie-fact">
          <span>Revenue:</span>
          {{
            currencyFormatter.format(movie.revenue)
          }}
        </p>
        <p class="movie-fact">
          <span>Overview:</span>
          {{ movie.overview }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "SingleMovie",
  data() {
    return {
      movie: '',
    }
  },
  async fetch() {
    await this.getSingleMovie()
  },
  fetchDelay: 1000,
  head() {
    return {
      title: this.movie.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.movie.overview,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.movie.title?.concat(",", this.movieGenres),
        },
      ],
    }
  },
  computed: {
    movieGenres() {
      return this.movie.genres.map((genre) => genre.name)
    },
    wordsFormatter() {
      return new Intl.ListFormat('en', { style: "long", type: "conjunction" });
    },
    dateFormat() {
      return new Date(this.movie.release_date).toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    },
    currencyFormatter() {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      })
    },
  },
  methods: {
    async getSingleMovie() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=589a0bba7dc58714016e2ba181e8e1f5&language=en-US`
      )
      const result = await data
      this.movie = result.data
    },
  },
}
</script>

<style lang="scss" scoped>
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;

  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }

  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;

    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }

    .movie-img {
      img {
        max-height: 500px;
        width: 100%;

        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }

    .movie-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }

      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;

        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }

      .tagline {
        font-style: italic;

        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>
