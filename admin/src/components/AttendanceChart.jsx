import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import MenuIcon from '@mui/icons-material/Menu';

// Mock attendance data for different days
const attendanceData = {
  '2024-01-15': [
    { hour: '08:00', visitors: 3, online: 2 },
    { hour: '09:00', visitors: 6, online: 4 },
    { hour: '10:00', visitors: 9, online: 7 },
    { hour: '11:00', visitors: 11, online: 8 },
    { hour: '12:00', visitors: 13, online: 9 },
    { hour: '13:00', visitors: 17, online: 13 },
    { hour: '14:00', visitors: 20, online: 16 },
    { hour: '15:00', visitors: 23, online: 19 },
    { hour: '16:00', visitors: 19, online: 15 },
    { hour: '17:00', visitors: 14, online: 11 },
    { hour: '18:00', visitors: 9, online: 7 },
    { hour: '19:00', visitors: 7, online: 5 },
    { hour: '20:00', visitors: 4, online: 3 },
  ],
  '2024-01-14': [
    { hour: '08:00', visitors: 2, online: 1 },
    { hour: '09:00', visitors: 5, online: 3 },
    { hour: '10:00', visitors: 8, online: 6 },
    { hour: '11:00', visitors: 10, online: 7 },
    { hour: '12:00', visitors: 12, online: 8 },
    { hour: '13:00', visitors: 15, online: 11 },
    { hour: '14:00', visitors: 18, online: 14 },
    { hour: '15:00', visitors: 21, online: 17 },
    { hour: '16:00', visitors: 17, online: 13 },
    { hour: '17:00', visitors: 13, online: 10 },
    { hour: '18:00', visitors: 8, online: 6 },
    { hour: '19:00', visitors: 6, online: 4 },
    { hour: '20:00', visitors: 3, online: 2 },
  ],
  '2024-01-13': [
    { hour: '08:00', visitors: 4, online: 3 },
    { hour: '09:00', visitors: 7, online: 5 },
    { hour: '10:00', visitors: 10, online: 8 },
    { hour: '11:00', visitors: 12, online: 9 },
    { hour: '12:00', visitors: 14, online: 10 },
    { hour: '13:00', visitors: 16, online: 12 },
    { hour: '14:00', visitors: 19, online: 15 },
    { hour: '15:00', visitors: 22, online: 18 },
    { hour: '16:00', visitors: 18, online: 14 },
    { hour: '17:00', visitors: 15, online: 12 },
    { hour: '18:00', visitors: 11, online: 8 },
    { hour: '19:00', visitors: 8, online: 6 },
    { hour: '20:00', visitors: 5, online: 4 },
  ],
};

const AttendanceChart = ({ onToggleSidebar }) => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [chartType, setChartType] = useState('bar');
  const [timeFilter, setTimeFilter] = useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredData = useMemo(() => {
    let data = attendanceData[selectedDate] || [];
    
    if (timeFilter === 'morning') {
      data = data.filter(d => {
        const hour = parseInt(d.hour.split(':')[0]);
        return hour >= 8 && hour < 12;
      });
    } else if (timeFilter === 'afternoon') {
      data = data.filter(d => {
        const hour = parseInt(d.hour.split(':')[0]);
        return hour >= 12 && hour < 18;
      });
    } else if (timeFilter === 'evening') {
      data = data.filter(d => {
        const hour = parseInt(d.hour.split(':')[0]);
        return hour >= 18 && hour <= 20;
      });
    }
    
    return data.length > 0 ? data : [{ hour: '00:00', visitors: 0, online: 0 }];
  }, [selectedDate, timeFilter]);

  const stats = useMemo(() => {
    if (filteredData.length === 0 || (filteredData.length === 1 && filteredData[0].visitors === 0)) {
      return { totalVisitors: 0, totalOnline: 0, peakHour: '-' };
    }
    
    const totalVisitors = filteredData.reduce((sum, d) => sum + d.visitors, 0);
    const totalOnline = filteredData.reduce((sum, d) => sum + d.online, 0);
    const validData = filteredData.filter(d => d.visitors > 0);
    const peakHour = validData.length > 0 
      ? validData.reduce((max, d) => d.visitors > max.visitors ? d : max, validData[0]).hour 
      : '-';
    
    return { totalVisitors, totalOnline, peakHour };
  }, [filteredData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && label) {
      return (
        <Box sx={{ 
          background: 'rgba(0, 0, 0, 0.8)', 
          backdropFilter: 'blur(10px)',
          p: 2, 
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 1,
          color: 'white',
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="caption" sx={{ color: entry.color || '#fff', display: 'block' }}>
              {entry.name}: {entry.value} человек
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ 
      p: isMobile ? 2 : 3, 
      backgroundColor: '#000000',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: 3,
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={onToggleSidebar}
            sx={{ 
              color: '#ffffff',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant={isSmallMobile ? "h5" : "h4"} 
            sx={{ 
              fontWeight: 300,
              letterSpacing: '-0.02em'
            }}
          >
            Посещаемость
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'center' : 'flex-end'
        }}>
          <FormControl size="small" sx={{ minWidth: isSmallMobile ? '100%' : 120 }}>
            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Дата</InputLabel>
            <Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              label="Дата"
              sx={{
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                fontSize: '0.875rem',
              }}
            >
              <MenuItem value="2024-01-15" sx={{ backgroundColor: '#000000', color: '#ffffff' }}>Сегодня</MenuItem>
              <MenuItem value="2024-01-14" sx={{ backgroundColor: '#000000', color: '#ffffff' }}>Вчера</MenuItem>
              <MenuItem value="2024-01-13" sx={{ backgroundColor: '#000000', color: '#ffffff' }}>Позавчера</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: isSmallMobile ? '100%' : 120 }}>
            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Время</InputLabel>
            <Select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              label="Время"
              sx={{
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                fontSize: '0.875rem',
              }}
            >
              <MenuItem value="all" sx={{ backgroundColor: '#000000', color: '#ffffff' }}>Весь день</MenuItem>
              <MenuItem value="morning" sx={{ backgroundColor: '#000000', color: '#ffffff' }}>Утро</MenuItem>
              <MenuItem value="afternoon" sx={{ backgroundColor: '#000000', color: '#ffffff' }}>День</MenuItem>
              <MenuItem value="evening" sx={{ backgroundColor: '#000000', color: '#ffffff' }}>Вечер</MenuItem>
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={(e, value) => value && setChartType(value)}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: 'rgba(255,255,255,0.7)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 1,
                padding: isSmallMobile ? '6px 8px' : '8px 12px',
                fontSize: '0.75rem',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              },
            }}
          >
            <ToggleButton value="bar">Столбцы</ToggleButton>
            <ToggleButton value="line">Линия</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: isMobile ? 2 : 3, 
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap' 
      }}>
        {/* Main Chart */}
        <Box sx={{ 
          flex: isMobile ? '1 1 100%' : '1 1 0%', 
          minWidth: isMobile ? '100%' : 400,
        }}>
          <Card sx={{ 
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2,
            boxShadow: 'none',
          }}>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography variant="h6" sx={{ 
                color: '#ffffff', 
                mb: 2, 
                fontSize: isSmallMobile ? '1rem' : '1.125rem',
                fontWeight: 300
              }}>
                Посещаемость по часам
              </Typography>
              <Box sx={{ 
                width: '100%', 
                height: isSmallMobile ? 250 : isMobile ? 300 : 350,
                minHeight: 200 
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  {(() => {
                    if (!filteredData || filteredData.length === 0) {
                      return (
                        <Box sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: 'rgba(255,255,255,0.5)'
                        }}>
                          <Typography variant="body2">Нет данных</Typography>
                        </Box>
                      );
                    }

                    const ChartComponent = chartType === 'bar' ? BarChart : LineChart;
                    const ChartElement = chartType === 'bar' ? Bar : Line;

                    return (
                      <ChartComponent 
                        data={filteredData} 
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke="rgba(255,255,255,0.1)" 
                        />
                        <XAxis 
                          dataKey="hour" 
                          stroke="rgba(255,255,255,0.5)"
                          fontSize={isSmallMobile ? 10 : 11}
                          tick={{ fill: 'rgba(255,255,255,0.5)' }}
                          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.5)" 
                          fontSize={isSmallMobile ? 10 : 11}
                          tick={{ fill: 'rgba(255,255,255,0.5)' }}
                          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ChartElement 
                          dataKey="visitors" 
                          fill="#ffffff"
                          stroke="#ffffff"
                          strokeWidth={chartType === 'line' ? 2 : 0}
                          name="Всего" 
                          radius={chartType === 'bar' ? [2, 2, 0, 0] : 0}
                          dot={chartType === 'line' ? { fill: '#ffffff', strokeWidth: 0, r: 3 } : false}
                          fillOpacity={0.7}
                        />
                      </ChartComponent>
                    );
                  })()}
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Stats Card */}
        <Box sx={{ 
          width: isMobile ? '100%' : 280,
        }}>
          <Card sx={{ 
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2,
            boxShadow: 'none',
          }}>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography variant="h6" sx={{ 
                color: '#ffffff', 
                mb: 3, 
                fontSize: isSmallMobile ? '1rem' : '1.125rem',
                fontWeight: 300
              }}>
                Статистика
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', mb: 0.5 }}>
                    Всего посетителей
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 300, fontSize: '2rem' }}>
                    {stats.totalVisitors}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', mb: 0.5 }}>
                    Онлайн
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#666666', fontWeight: 300, fontSize: '2rem' }}>
                    {stats.totalOnline}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', mb: 0.5 }}>
                    Пиковый час
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 300, fontSize: '1.5rem' }}>
                    {stats.peakHour}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceChart;