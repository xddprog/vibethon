import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Typography,
  LinearProgress,
  Grid,
  Paper,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Chip,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import {
  QrCodeScanner,
  CameraAlt,
  CalendarMonth,
  SupportAgent,
  HomeOutlined,
  BarChartOutlined,
  EmojiEventsOutlined,
  PersonOutline,
  SettingsOutlined,
  PeopleOutline,
  MonetizationOnOutlined,
  DateRangeOutlined,
  StarBorder,
  VideogameAssetOutlined,
  AssignmentIndOutlined
} from '@mui/icons-material';

// 1. НАСТРОЙКА ТЕМЫ С ВАШИМИ ЦВЕТАМИ
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#1C1C1E', // Для стандартных серых карточек
    },
    primary: {
      main: '#7BCEED', // Светлый оттенок из градиента
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8E8E93',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h3: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 16, textTransform: 'none', padding: '10px 20px' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 20, },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid #333 !important',
          color: '#8E8E93',
          '&.Mui-selected': {
            backgroundColor: '#7BCEED', // Используем светлый оттенок
            color: '#000',
          },
        },
      },
    },
  },
});

// 2. ОБЩИЕ КОМПОНЕНТЫ
const Header = () => (
  <Box component="header">
    <Box sx={{ mb: 3 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#0097CE', lineHeight: 1.1 }}>
        Коворкинг
      </Typography>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.1 }}>
        Г513
      </Typography>
    </Box>
    {/* ИСПРАВЛЕНО: Возвращен Grid container для корректного и простого выравнивания */}
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Grid item xs={6} sx={{ marginRight: 2 }}>
        <Paper sx={{ p: 2.5, background: 'linear-gradient(120deg, #0097CE 0%, #7BCEED 100%)', color: '#FFFFFF', borderRadius: '20px', height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
            Сканируй qr-код, чтобы отметиться и получить xp
          </Typography>
          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '8px', p: 1, display: 'inline-flex', alignSelf: 'flex-start' }}>
            <QrCodeScanner />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ p: 2.5, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderRadius: '20px', height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.4 }}>
            Задонать на развитие коворкинга 
          </Typography>
          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '8px', p: 1, display: 'inline-flex', alignSelf: 'flex-start' }}>
            <CameraAlt />
          </Box>
        </Paper>
      </Grid>
    </div>
  </Box>
);

const ScreenLayout = ({ children }) => (
  <Box sx={{ pb: '80px' }}>
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Header />
      <Box component="main" sx={{ mt: 4 }}>
        {children}
      </Box>
    </Container>
  </Box>
);

// 3. ЭКРАНЫ

// --- ЭКРАН "ГЛАВНАЯ" (MAIN) ---

const MainScreen = () => {
  const recentActions = [
    { id: 1, user: 'Мария С.', action: 'Забронировала комнату', icon: <CalendarMonth /> },
    { id: 2, user: 'Иван П.', action: 'Забронировал комнату', icon: <CalendarMonth /> },
    { id: 3, user: 'Анна К.', action: 'Задонатила на развитие', icon: <CameraAlt /> },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={2}>Быстрые действия</Typography>
      <Box sx={{ display: 'flex', mb: 4, gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<CalendarMonth />}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: 'text.primary',
            // === ИСПРАВЛЕНИЕ ЗДЕСЬ ===
            flex: 1, // Это свойство заставляет кнопки делить ширину строго поровну
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
          }}
        >
          Забронировать
        </Button>
        <Button
          variant="contained"
          startIcon={<SupportAgent />}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: 'text.primary',
            // === ИСПРАВЛЕНИЕ ЗДЕСЬ ===
            flex: 1, // Это свойство заставляет кнопки делить ширину строго поровну
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
          }}
        >
          Поддержка
        </Button>
      </Box>

      <Typography variant="h5" mb={2}>Последние действия</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {recentActions.map(item => (
          <Paper key={item.id} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, background: 'linear-gradient(90deg, #0097CE 0%, #7BCEED 100%)', color: '#FFF' }}>
            <Box>{item.icon}</Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.user}</Typography>
              <Typography variant="body2">{item.action}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

// --- ЭКРАН "СОСТОЯНИЕ" (STATE) ---
const StateScreen = () => {
  const stats = [
    { title: 'Количество людей', value: '24/50', icon: <PeopleOutline /> },
    { title: 'Собрано в этом месяце', value: '3,500 ₽', icon: <MonetizationOnOutlined /> },
    { title: 'Посещений на неделе', value: '156', icon: <DateRangeOutlined /> },
    { title: 'Активных пользователей', value: '45', icon: <StarBorder /> },
    { title: 'Состояние playstation', value: '●', color: '#34C759', icon: <VideogameAssetOutlined /> },
    { title: 'Ответственный', value: 'tg: @name', icon: <AssignmentIndOutlined /> },
  ];
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Состояние
        </Typography>
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#34C759' }} />
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 16,
        width: '100%'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ 
            flex: '1 1 calc(50% - 8px)', // 2 колонки с учетом gap
            minWidth: 'calc(50% - 8px)',
            maxWidth: 'calc(50% - 8px)'
          }}>
            <div style={{ 
              padding: 16,
              height: 160,
              backgroundColor: '#1C1C1E',
              borderRadius: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ 
                color: '#8E8E93',
                height: 32,
                display: 'flex',
                alignItems: 'center'
              }}>
                {React.cloneElement(stat.icon, { style: { fontSize: 28 } })}
              </div>
              <div style={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 'bold',
                    color: stat.color || '#FFFFFF',
                    fontSize: '1.5rem',
                    lineHeight: 1.2,
                    marginBottom: 4
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" style={{ 
                  color: '#8E8E93',
                  fontSize: '0.875rem'
                }}>
                  {stat.title}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Вспомогательные компоненты для чистоты кода ---
const users = [
  { rank: 1, name: 'Tg name', xp: 12500, role: 'Роль', rankColor: '#FFD60A' },
  { rank: 2, name: 'Tg name', xp: 11200, role: 'Роль', rankColor: '#0097CE' },
  { rank: 3, name: 'Tg name', xp: 9800, role: 'Роль', rankColor: '#E040FB' },
  { rank: 4, name: 'Tg name', xp: 8500 },
  { rank: 5, name: 'Tg name', xp: 8250 },
  { rank: 6, name: 'Tg name', xp: 7900 },
  { rank: 7, name: 'Tg name', xp: 7500 },
];

const PodiumItem = ({ user, order, size }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', order: order, mx: 1 }}>
    <Box sx={{ position: 'relative', mb: 1 }}>
      <Avatar sx={{ width: size, height: size, bgcolor: '#2C2C2E', border: '3px solid #444' }}>
        <PersonOutline sx={{ fontSize: size * 0.5 }} />
      </Avatar>
      <Chip 
        label={user.role} 
        size="small" 
        sx={{ 
          position: 'absolute', 
          top: 4, 
          right: -20,
          background: 'linear-gradient(90deg, #0097CE 0%, #7BCEED 100%)', 
          color: '#FFF', 
          fontWeight: 600,
          borderRadius: '16px',
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: -4, 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: user.rankColor,
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '0.8rem',
          border: '2px solid #000'
        }}
      >
        {user.rank}
      </Box>
    </Box>
    <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.name}</Typography>
    <Typography variant="body2" sx={{ color: '#0097CE', fontWeight: 500 }}>{user.xp} xp</Typography>
  </Box>
);

const RatingListItem = ({ user }) => (
  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
    <Typography
      sx={{
        position: 'absolute',
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '5rem',
        fontWeight: 700,
        color: 'rgba(255, 255, 255, 0.1)',
        zIndex: 1,
      }}
    >
      {user.rank}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, zIndex: 2, ml: 6 }}>
      <Avatar sx={{ bgcolor: '#2C2C2E', width: 48, height: 48 }}>
        <PersonOutline />
      </Avatar>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.name}</Typography>
        <Typography variant="body2" sx={{ color: '#0097CE', fontWeight: 500 }}>{user.xp} xp</Typography>
      </Box>
    </Box>
  </Paper>
);

// --- ОСНОВНОЙ КОМПОНЕНТ ЭКРАНА "РЕЙТИНГ" ---
const RatingScreen = () => {
    const [period, setPeriod] = useState('неделя');
    const podium = users.slice(0, 3);
    const list = users.slice(3);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ backgroundColor: '#000', p: 2, minHeight: '100vh' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Рейтинг
          </Typography>

          <ToggleButtonGroup 
            value={period} 
            exclusive 
            onChange={(e, v) => v && setPeriod(v)} 
            sx={{ mb: 4 }}
          >
            <ToggleButton value="неделя" sx={{ background: period === 'неделя' ? 'linear-gradient(90deg, #0097CE 0%, #7BCEED 100%)' : 'transparent', color: period === 'неделя' ? '#FFF' : '#8E8E93', border: '1px solid #444 !important', borderRadius: '20px !important', px: 3 }}>
              Неделя
            </ToggleButton>
            <ToggleButton value="месяц" sx={{ color: '#8E8E93', border: '1px solid #444 !important', borderRadius: '20px !important', mx: 1, px: 3 }}>
              Месяц
            </ToggleButton>
            <ToggleButton value="год" sx={{ color: '#8E8E93', border: '1px solid #444 !important', borderRadius: '20px !important', px: 3 }}>
              Год
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mb: 4, minHeight: 180 }}>
            <PodiumItem user={podium[1]} order={1} size={90} /> {/* 2nd place */}
            <PodiumItem user={podium[0]} order={2} size={100} /> {/* 1st place */}
            <PodiumItem user={podium[2]} order={3} size={90} /> {/* 3rd place */}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {list.map(user => (
              <RatingListItem key={user.rank} user={user} />
            ))}
          </Box>
        </Box>
      </ThemeProvider>
    );
};

// --- ЭКРАНЫ-ЗАГЛУШКИ ---
const PlaceholderScreen = ({ title }) => (
    <>
      {/* ИСПРАВЛЕНО: Опечатка */}
      <Typography variant="h5">{title}</Typography>
      <Typography sx={{mt: 2, color: 'text.secondary'}}>Страница в разработке</Typography>
    </>
);


const userData = {
  name: 'Ник',
  role: 'роль',
  level: 1,
  currentXp: 2,
  requiredXp: 40,
  visits: 1000,
  donations: '100000+ руб',
  achievements: ['роль', 'Фифер']
};

const ProfileScreen = () => {
  const progress = (userData.currentXp / userData.requiredXp) * 100;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Профиль
      </Typography>

      {/* --- БЛОК С ИНФОРМАЦИЕЙ О ПОЛЬЗОВАТЕЛЕ --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: '#2C2C2E' }}>
            <PersonOutline sx={{ fontSize: 40 }}/>
        </Avatar>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{userData.name}</Typography>
          <Typography variant="body2" color="text.secondary">{userData.role}</Typography>
          
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Lvl {userData.level}</Typography>
              <Typography variant="body2" color="text.secondary">xp: {userData.currentXp}/{userData.requiredXp}</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: '#FF8A80', // Розовый цвет из макета
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* --- БЛОК ДОСТИЖЕНИЙ --- */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Достижения
      </Typography>
      <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '24px', mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label="роль" 
            variant="outlined"
            sx={{ 
              color: '#FFCDCD',
              borderColor: '#D16D6D',
              fontWeight: 500,
            }} 
          />
          <Chip 
            label="Фифер" 
            variant="outlined"
            sx={{ 
              color: '#E1FFE2',
              borderColor: '#90C695',
              fontWeight: 500,
            }} 
          />
        </Box>
      </Paper>

      {/* === ИСПРАВЛЕНИЕ: БЛОКИ ВМЕСТО ТЕКСТА === */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '24px', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{userData.visits}</Typography>
                <Typography variant="body2" color="text.secondary">кол-во визитов</Typography>
            </Paper>
        </Grid>
        <Grid item xs={6}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '24px', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{userData.donations}</Typography>
                <Typography variant="body2" color="text.secondary">кол-во донатов (руб)</Typography>
            </Paper>
        </Grid>
      </Grid>
      {/* === КОНЕЦ ИСПРАВЛЕНИЯ === */}
    </Box>
  );
};

// 4. ГЛАВНЫЙ КОМПОНЕНТ APP
function App() {
  // ИСПРАВЛЕНО: Опечатки
  const [activeScreen, setActiveScreen] = useState('main');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'main': return <MainScreen />;
      case 'state': return <StateScreen />;
      case 'rating': return <RatingScreen />;
      case 'profile': return <ProfileScreen />
      case 'other': return <PlaceholderScreen title="Другое"/>;
      default: return <MainScreen />;
    }
  };

  // ИСПРАВЛЕНО: Опечатки
  const screenMap = ['main', 'state', 'rating', 'profile', 'other'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScreenLayout>
        {renderScreen()}
      </ScreenLayout>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#1C1C1E', borderTop: '1px solid #333' }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          // ИСПРАВЛЕНО: Опечатки
          value={screenMap.indexOf(activeScreen)}
          onChange={(event, newValue) => {
           setActiveScreen(screenMap[newValue]);
          }}
          sx={{ backgroundColor: 'transparent' }}
        >
          {/* ИСПРАВЛЕНО: Опечатки */}
          <BottomNavigationAction label="Главная" icon={<HomeOutlined />} />
          <BottomNavigationAction label="Состояние" icon={<BarChartOutlined />} />
          <BottomNavigationAction label="Рейтинг" icon={<EmojiEventsOutlined />} />
          <BottomNavigationAction label="Профиль" icon={<PersonOutline />} />
          <BottomNavigationAction label="Другое" icon={<SettingsOutlined />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
}

export default App;