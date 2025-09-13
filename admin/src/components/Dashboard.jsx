import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Fade,
} from '@mui/material';
import { People, Star, MonetizationOn, CalendarToday } from '@mui/icons-material';
import AttendanceChart from './AttendanceChart';

// Enhanced mock data
const metrics = [
  { value: '24/50', label: 'Количество людей', icon: <People />, color: '#007AFF' },
  { value: '3,500 ₽', label: 'Собрано в этом месяце', icon: <MonetizationOn />, color: '#FF9500' },
  { value: 156, label: 'Посещений на неделе', icon: <CalendarToday />, color: '#34C759' },
  { value: 45, label: 'Активных пользователей', icon: <Star />, color: '#AF52DE' },
];

const recentActivity = [
  { user: 'Иван Иванов', action: 'получил +10 XP за Check-in', time: '15:02', type: 'login', color: '#007AFF', icon: '👤' },
  { user: 'Мария Петрова', action: 'получила +100 XP за организацию митапа', time: '14:55', type: 'achievement', color: '#FF9500', icon: '🏆' },
  { user: 'Анна Кузнецова', action: 'получила +5 XP за помощь другу', time: '14:35', type: 'help', color: '#34C759', icon: '🤝' },
  { user: 'Дмитрий Волков', action: 'отмечен в коворкинге', time: '14:20', type: 'coworking', color: '#AF52DE', icon: '💼' },
];

const topUsers = [
  { name: 'Александр Иванов', xp: 1250, role: 'Ментор', avatar: '👑', color: '#007AFF' },
  { name: 'Мария Петрова', xp: 980, role: 'Организатор', avatar: '🥈', color: '#FF9500' },
  { name: 'Иван Сидоров', xp: 850, role: 'Волонтёр', avatar: '🥉', color: '#34C759' },
  { name: 'Елена Волкова', xp: 720, role: 'Участник', avatar: '⭐', color: '#AF52DE' },
  { name: 'Дмитрий Кузнецов', xp: 650, role: 'Участник', avatar: '⭐', color: '#007AFF' },
];

const Dashboard = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: '#000000', minHeight: '100vh' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          color: '#ffffff', 
          fontWeight: 700,
        }}
      >
        Админ Панель
      </Typography>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Fade in={true} timeout={600 + index * 100}>
              <Card sx={{ 
                backgroundColor: '#1C1C1E',
                border: `1px solid ${metric.color}30`,
                borderRadius: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#E0E0E0', fontSize: '0.875rem' }}>
                        {metric.label}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      color: metric.color, 
                      fontSize: '2rem',
                      ml: 2,
                      opacity: 0.8
                    }}>
                      {React.cloneElement(metric.icon, { fontSize: 'large' })}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Attendance Chart */}
      <Box>
        <AttendanceChart />
      </Box>

      {/* Activity and Top Users */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            backgroundColor: '#111111',
            border: '1px solid #333333',
            borderRadius: 2,
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2, fontWeight: 600 }}>
                Последняя активность
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivity.map((activity, index) => (
                  <Fade in={true} timeout={400 + index * 100} key={index}>
                    <ListItem sx={{ px: 0, py: 1, borderBottom: index < recentActivity.length - 1 ? '1px solid #222222' : 'none' }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          backgroundColor: '#222222',
                          color: '#ffffff',
                          border: `1px solid ${activity.color}`,
                          width: 36,
                          height: 36,
                          fontSize: '1rem'
                        }}>
                          {activity.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 500, fontSize: '0.9rem' }}>
                            {activity.user}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ color: '#888888', fontSize: '0.8rem' }}>
                            {activity.action} • {activity.time}
                          </Typography>
                        }
                      />
                      <Chip 
                        label={activity.type}
                        size="small"
                        sx={{ 
                          backgroundColor: activity.color + '20',
                          color: activity.color,
                          border: `1px solid ${activity.color}50`,
                          fontSize: '0.7rem',
                          height: 22
                        }}
                      />
                    </ListItem>
                  </Fade>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            backgroundColor: '#111111',
            border: '1px solid #333333',
            borderRadius: 2,
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2, fontWeight: 600 }}>
                Топ пользователей
              </Typography>
              <List sx={{ p: 0 }}>
                {topUsers.map((user, index) => (
                  <Fade in={true} timeout={400 + index * 100} key={index}>
                    <ListItem sx={{ px: 0, py: 1, borderBottom: index < topUsers.length - 1 ? '1px solid #222222' : 'none' }}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          backgroundColor: '#222222',
                          color: '#ffffff',
                          border: `1px solid ${user.color}`,
                          width: 36,
                          height: 36,
                          fontSize: '1rem'
                        }}>
                          {user.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 500, fontSize: '0.9rem' }}>
                            {user.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ color: '#888888', fontSize: '0.8rem' }}>
                            {user.xp} XP • {user.role}
                          </Typography>
                        }
                      />
                      <Chip 
                        label={`#${index + 1}`}
                        size="small"
                        sx={{ 
                          backgroundColor: user.color + '20',
                          color: user.color,
                          border: `1px solid ${user.color}50`,
                          fontSize: '0.7rem',
                          height: 22
                        }}
                      />
                    </ListItem>
                  </Fade>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;