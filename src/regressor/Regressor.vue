<template src="./Regressor.html">
  
</template>

<script>
export default {
  data (){
    return {
      rmse: 0,
      columns: [],
      options: {},
      predicted_df: [],
      tableData: [],
      chart: {},
    }},                      
    
  created() {
    this.fetchPredicted()
  },
  methods: {
    fetchPredicted() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/regressor/predicted/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        this.predicted_df = data.body['data']
        this.columns = data.body['columns']
      })
    
    },
  }
}
</script>

<style scoped>
.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}
</style>
