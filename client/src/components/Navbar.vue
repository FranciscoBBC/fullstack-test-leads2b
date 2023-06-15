<template>
  <nav class="navbar navbar-expand-lg navbar-dark position-fixed w-100" v-if="isAuthenticated">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="/">
        <!-- <img src="https://leads2b.com/wp-content/uploads/2020/07/logo-leads2b_C.svg" alt=""> -->
        <span>Projects2b</span>
        <span class="mx-3">|</span>
        <span>{{company.name}}</span>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
              {{user.firstName}}
            </a>

            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <li>
                <button type="button" class="dropdown-item" @click="logout">Sair</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters([
      'company',
      'user',
      'isAuthenticated'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>
