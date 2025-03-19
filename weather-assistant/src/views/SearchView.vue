<template>
  <div class="search">
    <div class="search-container">
      <el-input
        v-model="searchQuery"
        placeholder="輸入地點名稱"
        class="search-input"
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <div v-if="searchResults.length > 0" class="results-container">
      <el-row :gutter="20">
        <el-col :span="24" :md="12" :lg="8" v-for="location in searchResults" :key="location.id">
          <el-card class="location-card" @click="$router.push(`/weather/${location.id}`)">
            <template #header>
              <div class="card-header">
                <span class="location-name">{{ location.name }}</span>
                <el-button 
                  type="primary" 
                  size="small" 
                  @click.stop="toggleFavorite(location)"
                  :icon="location.isFavorite ? 'Star' : 'StarFilled'"
                >
                  {{ location.isFavorite ? '取消收藏' : '收藏' }}
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
    </div>

    <div v-else-if="hasSearched" class="no-results">
      <el-empty description="找不到相關地點">
        <el-button type="primary" @click="searchQuery = ''; hasSearched = false">
          重新搜尋
        </el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Star, StarFilled, Cloudy, Lightning, WindPower } from '@element-plus/icons-vue'

const searchQuery = ref('')
const hasSearched = ref(false)

// 模擬搜尋結果
const searchResults = ref([
  {
    id: 1,
    name: '台北市',
    temperature: 25,
    weather: '多雲',
    humidity: 65,
    rainProbability: 30,
    windSpeed: 12,
    isFavorite: false
  },
  {
    id: 2,
    name: '高雄市',
    temperature: 28,
    weather: '晴朗',
    humidity: 70,
    rainProbability: 10,
    windSpeed: 8,
    isFavorite: true
  }
])

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    hasSearched.value = true
    // TODO: 實現實際的搜尋邏輯
  }
}

const toggleFavorite = (location: any) => {
  location.isFavorite = !location.isFavorite
  // TODO: 實現收藏/取消收藏的後端邏輯
}
</script>

<style scoped lang="scss">
.search {
  padding: 20px;
}

.search-container {
  margin-bottom: 30px;
}

.search-input {
  max-width: 600px;
  margin: 0 auto;
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

.no-results {
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