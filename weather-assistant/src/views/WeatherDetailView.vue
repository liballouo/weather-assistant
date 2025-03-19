<template>
  <div class="weather-detail">
    <el-container>
      <el-header>
        <h1>{{ location }}天氣詳情</h1>
        <el-menu mode="horizontal" router>
          <el-menu-item index="/">首頁</el-menu-item>
          <el-menu-item index="/search">搜尋</el-menu-item>
          <el-menu-item index="/favorites">收藏地點</el-menu-item>
        </el-menu>
      </el-header>
      
      <el-main>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-card class="weather-card">
              <template #header>
                <div class="card-header">
                  <span>即時天氣</span>
                  <el-button type="primary" @click="refreshWeather">更新</el-button>
                </div>
              </template>
              
              <div v-if="weatherData" class="weather-info">
                <div class="temperature">
                  <h2>{{ weatherData.temperature }}°C</h2>
                  <p>{{ weatherData.weatherDescription }}</p>
                </div>
                
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="weather-detail">
                      <el-icon><Moisture /></el-icon>
                      <p>濕度: {{ weatherData.humidity }}%</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="weather-detail">
                      <el-icon><Umbrella /></el-icon>
                      <p>降雨機率: {{ weatherData.rainProbability }}%</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="weather-detail">
                      <el-icon><WindPower /></el-icon>
                      <p>風速: {{ weatherData.windSpeed }} m/s</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
              
              <div v-else class="loading">
                <el-skeleton :rows="3" animated />
              </div>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card class="air-quality-card">
              <template #header>
                <div class="card-header">
                  <span>空氣品質</span>
                </div>
              </template>
              
              <div v-if="airQualityData" class="air-quality-info">
                <div class="aqi-value" :class="getAqiClass(airQualityData.aqi)">
                  {{ airQualityData.aqi }}
                </div>
                <p>{{ airQualityData.description }}</p>
                
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="air-quality-detail">
                      <p>PM2.5: {{ airQualityData.pm25 }} μg/m³</p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="air-quality-detail">
                      <p>PM10: {{ airQualityData.pm10 }} μg/m³</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
              
              <div v-else class="loading">
                <el-skeleton :rows="3" animated />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Cloudy, Lightning, WindPower } from '@element-plus/icons-vue'
import { weatherService, type WeatherData, type AirQualityData } from '@/services/weatherService'

const route = useRoute()
const location = ref(route.params.location as string)
const weatherData = ref<WeatherData | null>(null)
const airQualityData = ref<AirQualityData | null>(null)

const fetchWeatherData = async () => {
  try {
    weatherData.value = await weatherService.getWeatherData(location.value)
    airQualityData.value = await weatherService.getAirQualityData(location.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const refreshWeather = () => {
  fetchWeatherData()
}

const getAqiClass = (aqi: number) => {
  if (aqi <= 50) return 'good'
  if (aqi <= 100) return 'moderate'
  if (aqi <= 150) return 'unhealthy-sensitive'
  if (aqi <= 200) return 'unhealthy'
  if (aqi <= 300) return 'very-unhealthy'
  return 'hazardous'
}

onMounted(() => {
  fetchWeatherData()
})
</script>

<style scoped lang="scss">
.weather-detail {
  .el-header {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0 20px;
    
    h1 {
      margin: 0;
      padding: 20px 0;
      color: #409EFF;
    }
  }
  
  .el-main {
    padding: 20px;
    
    .weather-card, .air-quality-card {
      margin-bottom: 20px;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    
    .weather-info {
      .temperature {
        text-align: center;
        margin-bottom: 20px;
        
        h2 {
          font-size: 48px;
          margin: 0;
          color: #409EFF;
        }
      }
      
      .weather-detail {
        text-align: center;
        padding: 10px;
        
        .el-icon {
          font-size: 24px;
          color: #409EFF;
          margin-bottom: 5px;
        }
      }
    }
    
    .air-quality-info {
      text-align: center;
      
      .aqi-value {
        font-size: 48px;
        font-weight: bold;
        margin: 20px 0;
        padding: 20px;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        line-height: 80px;
        margin: 0 auto;
        
        &.good { background-color: #67C23A; color: white; }
        &.moderate { background-color: #E6A23C; color: white; }
        &.unhealthy-sensitive { background-color: #F56C6C; color: white; }
        &.unhealthy { background-color: #F56C6C; color: white; }
        &.very-unhealthy { background-color: #909399; color: white; }
        &.hazardous { background-color: #909399; color: white; }
      }
      
      .air-quality-detail {
        margin-top: 20px;
      }
    }
    
    .loading {
      padding: 20px;
    }
  }
}
</style> 