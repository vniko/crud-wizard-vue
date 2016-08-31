<template>
  <!-- BEGIN HEADER -->
  <div class="page-header md-shadow-z-1-i navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner">
      <!-- BEGIN LOGO -->
      <div class="page-logo">
      lOGO
      </div>
      <div class="hor-menu hor-menu-light hidden-sm hidden-xs">
        <ul class="nav navbar-nav">
          <!-- DOC: Remove data-hover="dropdown" and data-close-others="true" attributes below to disable the horizontal opening on mouse hover -->
          <li class="classic-menu-dropdown active">
            <a href="index.html">
              Dashboard <span class="selected">
					</span>
            </a>
          </li>
          <li class="mega-menu-dropdown">
            <a data-toggle="dropdown" href="javascript:;" class="dropdown-toggle" aria-expanded="true">
              Mega <i class="fa fa-angle-down"></i>
            </a>
            <ul class="dropdown-menu" style="min-width: 700px;">
              <li>
                <!-- Content container to add padding -->
                <div class="mega-menu-content">

                </div>
              </li>
            </ul>
          </li>


        </ul>
      </div>

      <div class="top-menu">
TOP menu
      </div>
      <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
  </div>
  <!-- END HEADER -->
  <div class="clearfix">
  </div>
  <!-- BEGIN CONTAINER -->
  <div class="page-container">
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
      <div class="page-content" style="min-height:382px">
        <h3 class="page-title">
          Lalalala <small>yayayaya</small>
        </h3>
        <div class="page-bar">
          <ul class="page-breadcrumb">
            <li>
              <i class="fa fa-home"></i>
              <a v-link="{ name: 'model_index'}">Models index</a>
              <i class="fa fa-angle-right"  v-if="configLoaded"></i>
            </li>
            <li v-if="configLoaded">
              {{ model.name }}
            </li>
          </ul>
          <div class="page-toolbar">
            <div class="btn-group pull-right">
              <button type="button" class="btn btn-fit-height grey-salt dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">
                Actions <i class="fa fa-angle-down"></i>
              </button>
              <ul class="dropdown-menu pull-right" role="menu">
                <li>
                  <a href="#">Action</a>
                </li>


                <li class="divider">
                </li>
                <li>
                  <a href="#">Separated link</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- END PAGE HEADER-->
        <!-- BEGIN PAGE CONTENT-->
        <div class="row margin-bottom-20 margin-top-20">

          <!-- BEGIN PAGE CONTENT-->
          <router-view></router-view>
          <!-- END PAGE CONTENT-->

        </div>

        <!-- END PAGE CONTENT-->
      </div>
    </div>
    <!-- END CONTENT -->
  </div>
  <!-- END CONTAINER -->
  <!-- BEGIN FOOTER -->
  <div class="page-footer">
    <div class="page-footer-inner">
      EEE
    </div>
    <div class="scroll-to-top">
      <i class="icon-arrow-up"></i>
    </div>
  </div>
  <!-- END FOOTER -->

</template>

<script>
  import store from '../vuex/store'
  import {getModel, configLoaded} from '../vuex/getters'

  export default{

    vuex: {
      getters: {
        model: getModel,
        configLoaded: configLoaded
      }
    }
  }
</script>