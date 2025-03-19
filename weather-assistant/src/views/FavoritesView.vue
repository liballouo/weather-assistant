<template>
  <div class="favorites">
    <el-row :gutter="20">
      <el-col :span="24" :md="12" :lg="8" v-for="location in favoriteLocations" :key="location.id">
        <el-card class="location-card" @click="$router.push(`/weather/${location.id}`)">
          <template #header>
            <div class="card-header">
              <span class="location-name">{{ location.name }}</span>
              <el-button type="danger" size="small" @click.stop="removeFavorite(location.id)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </template>
          <div class="weather-info">
            <div class="temperature">{{ location.temperature }}°C</div>
            <div class="weather">{{ location.weather }}</div>
            <div class="details">
              <div class="detail-item">
                <el-icon><Cloudy /></el-icon>
                <span>濕度: {{ location.humidity }}%</span>
              </div>
              <div class="detail-item">
                <el-icon><Lightning /></el-icon>
                <span>降雨機率: {{ location.rainProbability }}%</span>
              </div>
              <div class="detail-item">
                <el-icon><WindPower /></el-icon>
                <span>風速: {{ location.windSpeed }} km/h</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="favoriteLocations.length === 0" class="empty-state">
      <el-empty description="還沒有收藏的地點">
        <el-button type="primary" @click="$router.push('/search')">
          立即搜尋
        </el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Cloudy, Lightning, WindPower } from '@element-plus/icons-vue'

// 模擬收藏地點數據
const favoriteLocations = ref([
  {
    id: 1,
    name: '台北市',
    temperature: 25,
    weather: '多雲',
    humidity: 65,
    rainProbability: 30,
    windSpeed: 12
  },
  {
    id: 2,
    name: '高雄市',
    temperature: 28,
    weather: '晴朗',
    humidity: 70,
    rainProbability: 10,
    windSpeed: 8
  }
])

const removeFavorite = (id: number) => {
  favoriteLocations.value = favoriteLocations.value.filter(loc => loc.id !== id)
}
</script>

<style scoped lang="scss">
.favorites {
  padding: 20px;
}

.location-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;

    .location-name {
      font-size: 1.1em;
      font-weight: 500;
      color: #303133;
    }
  }

  .weather-info {
    text-align: center;
    padding: 10px 0;

    .temperature {
      font-size: 2.2em;
      font-weight: bold;
      color: #409EFF;
      margin-bottom: 8px;
      line-height: 1.2;
    }

    .weather {
      font-size: 1.1em;
      color: #606266;
      margin-bottom: 12px;
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 8px;
      color: #909399;
      font-size: 0.9em;

      .detail-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        .el-icon {
          font-size: 1.1em;
        }
      }
    }
  }
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

@media screen and (min-width: 768px) {
  .location-card {
    .weather-info {
      .temperature {
        font-size: 2.5em;
      }

      .weather {
        font-size: 1.2em;
      }

      .details {
        font-size: 1em;
        flex-direction: row;
        justify-content: space-around;
      }
    }
  }
}
</style> 