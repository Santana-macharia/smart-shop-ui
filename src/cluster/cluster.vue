<template src="./cluster.html">
  
</template>

<script>
export default {
  data (){
    return {
      distinct_rows: {},
      distinct_rows_percentage: 0,
      distinct_ids: {},
      distinct_ids_percentage: 0,
      columns: [],
      options: {},
      clean_data: [],
      tableData: [],
      chart: {
                    config: {
                        dataLoaded: true,
                        font_color: "black"
                    },
                    option:{
                      font_color:"black",
                        calculable: false,
                        series: [{
                                name: 'Metric',
                                type: 'pie',
                                radius: [30, 100],
                                roseType: 'area',
                                selectedOffset: 1,
                                selectedMode: 'single',
                                x: '50%', // for funnel
                                width: '100%', // for funnel
                                max: 70, // for funnel
                                
                                
                                data: [{
                                        value: 100,
                                        name: 'Distinct Rows',
                                        
                                    },
                                    {
                                        value: 90,
                                        name: 'Distinct Ids'
                                    }
                                    
                                ]
                            },
                            {
                                name: 'Overall',
                                type: 'pie',
                                radius: [115, 125],
                                startAngle: 180,
                                selectedOffset: 1,

                                // for funnel
                                x: '60%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 100,

                                itemStyle: {
                                    normal: {
                                      color:"#659EC7",
                                      
                                        labelLine: {
                                            show: false,
                                            
                                        }
                                    }
                                },

                                data: [{
                                        value: 100,
                                        
                                    },
                                   
                                ]
                            },
                           
                        ]
                    }
                },
    }
  },
  created() {
    this.fetchRows(),
    this.fetchIds(),
    this.fetchMissing(),
    this.fetchClean()
  },
  methods: {
    fetchRows() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/rows/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        this.distinct_rows = data.body[0]
        this.distinct_rows_percentage = (this.distinct_rows.distinct_rows / this.total_count)*100

        if (this.distinct_rows_percentage != NaN) {
          this.distinct_rows_percentage = 100
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchIds() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/ids/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        this.distinct_ids = data.body[0]
        this.distinct_ids_percentage = (this.distinct_ids.distinct_ids / this.distinct_ids.total_ids)*100
        
        if (this.distinct_ids_percentage == NaN) {
          this.distinct_ids_percentage = 100
        }

      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchMissing() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/missing/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        this.item = data.body[0]
 
        var res = JSON.parse(this.item.missing_columns);
        var res_length = res.length;
        for (var i = 0; i < res_length; i++) {
            var array = res[i].split("=");
            var value = array[1];
            this.tableData.push(value);
        }
        console.log(this.tableData)

      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchClean() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/clean_data/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        this.clean_data = data.body['data']
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
