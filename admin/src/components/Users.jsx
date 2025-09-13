import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  Chip,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Search, Add, AdminPanelSettings, PersonOff, History, BarChart, Person, PersonAdd, PersonRemove, Block, LockOpen, CheckCircle, Cancel, MeetingRoom, Assessment } from '@mui/icons-material';

// Enhanced mock users data
const mockUsers = [
  {
    id: 1,
    avatar: 'https://via.placeholder.com/40',
    username: 'alex_ivanov',
    role: 'Студент',
    level: 12,
    xp: 1250,
    lastVisit: '25.10.2023 15:30',
    isAdmin: false,
    isBanned: false,
    totalVisits: 45,
    totalDonations: 1200,
    joinDate: '15.09.2023',
  },
  {
    id: 2,
    avatar: 'https://via.placeholder.com/40',
    username: 'maria_petrova',
    role: 'Аспирант',
    level: 10,
    xp: 980,
    lastVisit: '25.10.2023 14:55',
    isAdmin: true,
    isBanned: false,
    totalVisits: 38,
    totalDonations: 800,
    joinDate: '20.09.2023',
  },
  {
    id: 3,
    avatar: 'https://via.placeholder.com/40',
    username: 'ivan_sidorov',
    role: 'Студент',
    level: 9,
    xp: 850,
    lastVisit: '25.10.2023 14:30',
    isAdmin: false,
    isBanned: true,
    totalVisits: 25,
    totalDonations: 0,
    joinDate: '01.10.2023',
  },
];

const mockXPHistory = [
  { id: 1, date: '25.10.2023 15:02', operation: 'Check-in', value: '+10', reason: '-' },
  { id: 2, date: '25.10.2023 14:55', operation: 'Начисление админом', value: '+100', reason: 'Помощь с митапом' },
  { id: 3, date: '24.10.2023 12:30', operation: 'Донат', value: '+50', reason: 'Принес печенье' },
];

const mockVisitHistory = [
  { id: 1, date: '25.10.2023 15:30', type: 'Вход', duration: '2 часа 15 мин', location: 'Коворкинг' },
  { id: 2, date: '25.10.2023 13:15', type: 'Вход', duration: '45 мин', location: 'Коворкинг' },
  { id: 3, date: '24.10.2023 14:00', type: 'Вход', duration: '3 часа', location: 'Коворкинг' },
  { id: 4, date: '23.10.2023 16:30', type: 'Вход', duration: '1 час 30 мин', location: 'Коворкинг' },
];

const Users = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [xpAmount, setXpAmount] = useState('');
    const [xpReason, setXpReason] = useState('');
    const [adminNotes, setAdminNotes] = useState('');
    const [users, setUsers] = useState(mockUsers);

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="avatar"
          style={{ width: 30, height: 30, borderRadius: '50%' }}
        />
      ),
    },
    { field: 'username', headerName: 'Ник', width: 150 },
    { field: 'role', headerName: 'Роль', width: 100 },
    { field: 'level', headerName: 'Уровень', width: 80 },
    { field: 'xp', headerName: 'Баланс XP', width: 100 },
    { field: 'lastVisit', headerName: 'Последний визит', width: 150 },
    {
      field: 'status',
      headerName: 'Статус',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.row.isBanned ? 'Забанен' : 'Активен'}
          size="small"
          color={params.row.isBanned ? 'error' : 'success'}
          sx={{ fontSize: '0.75rem' }}
        />
      ),
    },
    {
      field: 'admin',
      headerName: 'Админ',
      width: 80,
      renderCell: (params) => (
        <Chip
          label={params.row.isAdmin ? 'Да' : 'Нет'}
          size="small"
          color={params.row.isAdmin ? 'primary' : 'default'}
          sx={{ fontSize: '0.75rem' }}
        />
      ),
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleRowClick = (params) => {
    setSelectedUser(params.row);
    setOpenDialog(true);
    setTabValue(0);
  };

  const handleToggleAdmin = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, isAdmin: !user.isAdmin, role: !user.isAdmin ? 'Админ' : 'Пользователь' }
        : user
    ));
    setSelectedUser({ ...selectedUser, isAdmin: !selectedUser.isAdmin, role: !selectedUser.isAdmin ? 'Админ' : 'Пользователь' });
  };

  const handleToggleBan = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, isBanned: !user.isBanned, status: !user.isBanned ? 'Заблокирован' : 'Активен' }
        : user
    ));
    setSelectedUser({ ...selectedUser, isBanned: !selectedUser.isBanned, status: !selectedUser.isBanned ? 'Заблокирован' : 'Активен' });
  };

  const getUserStatistics = (user) => {
    const totalVisits = Math.floor(Math.random() * 50) + 10;
    const totalXP = user.xp || 0;
    const avgXPPerVisit = totalVisits > 0 ? Math.round(totalXP / totalVisits) : 0;
    const daysActive = Math.floor(Math.random() * 30) + 1;
    
    return {
      totalVisits,
      totalXP,
      avgXPPerVisit,
      daysActive,
    };
  };

  const handleXPOperation = (operation) => {
    if (!xpAmount || !xpReason) return;

    const amount = parseInt(xpAmount);
    if (isNaN(amount) || amount <= 0) return;

    console.log(`${operation} ${amount} XP to ${selectedUser.username} for: ${xpReason}`);

    // Reset form
    setXpAmount('');
    setXpReason('');
  };

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
        Управление пользователями
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Поиск пользователей..."
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            backgroundColor: '#111111',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              color: '#ffffff',
              '& fieldset': {
                borderColor: '#333333',
              },
              '&:hover fieldset': {
                borderColor: '#444444',
              },
            },
          }}
          InputProps={{
            startAdornment: <Search sx={{ color: '#666666', mr: 1 }} />,
          }}
        />
        <Button
          variant="contained"
          onClick={() => console.log('Add user clicked')}
          sx={{
            backgroundColor: '#333333',
            color: '#666666',
            fontWeight: 600,
            borderRadius: 2,
            cursor: 'not-allowed',
          }}
          disabled
        >
          <Add sx={{ mr: 1 }} /> Добавить пользователя
        </Button>
      </Box>

      <Card sx={{ 
        backgroundColor: '#111111',
        border: '1px solid #333333',
        borderRadius: 2,
      }}>
        <Box sx={{ p: 3 }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            onRowClick={handleRowClick}
            sx={{
              border: 'none',
              backgroundColor: '#111111',
              color: '#ffffff',
              '& .MuiDataGrid-root': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#222222',
                borderBottom: '1px solid #333333',
                color: '#ffffff',
              },
              '& .MuiDataGrid-row': {
                backgroundColor: '#111111',
                borderBottom: '1px solid #222222',
                '&:hover': {
                  backgroundColor: '#222222',
                },
              },
              '& .MuiDataGrid-cell': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-checkbox': {
                color: '#666666',
              },
            }}
          />
        </Box>
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#111111',
            border: '1px solid #333333',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>
          Карточка пользователя: {selectedUser?.username}
        </DialogTitle>
        <DialogContent>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: '#333333',
              '& .MuiTab-root': {
                color: '#666666',
                '&.Mui-selected': {
                  color: '#007AFF',
                },
              },
            }}
          >            <Tab label="Статистика" />
            <Tab label="История посещений" />
            <Tab label="XP История" />
            <Tab label="Админ действия" />
          </Tabs>

          {tabValue === 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mb: 3 }}>
                📊 Статистика пользователя
              </Typography>
              
              {selectedUser && (
                <Box sx={{ mb: 3 }}>
                  {(() => {
                    const stats = getUserStatistics(selectedUser);
                    return (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Paper sx={{ p: 2, backgroundColor: '#222222', border: '1px solid #333333', borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ color: '#888888' }}>Всего визитов</Typography>
                            <Typography variant="h6" sx={{ color: '#007AFF', fontWeight: 600 }}>{stats.totalVisits}</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Paper sx={{ p: 2, backgroundColor: '#222222', border: '1px solid #333333', borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ color: '#888888' }}>Всего XP</Typography>
                            <Typography variant="h6" sx={{ color: '#34C759', fontWeight: 600 }}>{stats.totalXP}</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Paper sx={{ p: 2, backgroundColor: '#222222', border: '1px solid #333333', borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ color: '#888888' }}>Средний XP за визит</Typography>
                            <Typography variant="h6" sx={{ color: '#FF9500', fontWeight: 600 }}>{stats.avgXPPerVisit}</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Paper sx={{ p: 2, backgroundColor: '#222222', border: '1px solid #333333', borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ color: '#888888' }}>Дней активности</Typography>
                            <Typography variant="h6" sx={{ color: '#E0E0E0', fontWeight: 600, fontSize: '0.875rem' }}>{stats.daysActive}</Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    );
                  })()}
                </Box>
              )}

              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff', mt: 4, mb: 2 }}>
                ⚙️ Панель управления XP
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Количество XP"
                    type="number"
                    value={xpAmount}
                    onChange={(e) => setXpAmount(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#ffffff',
                        '& fieldset': { borderColor: '#333333' },
                        '&:hover fieldset': { borderColor: '#444444' },
                      },
                      '& .MuiInputLabel-root': { color: '#888888' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Причина"
                    value={xpReason}
                    onChange={(e) => setXpReason(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#ffffff',
                        '& fieldset': { borderColor: '#333333' },
                      '&:hover fieldset': { borderColor: '#444444' },
                      },
                      '& .MuiInputLabel-root': { color: '#888888' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleXPOperation('Начислить')}
                      sx={{
                        backgroundColor: '#1a5e1a',
                        color: '#ffffff',
                        '&:hover': { backgroundColor: '#2d7a2d' },
                      }}
                    >
                      Начислить XP
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleXPOperation('Списать')}
                      sx={{
                        backgroundColor: '#8b2635',
                        color: '#ffffff',
                        '&:hover': { backgroundColor: '#a53244' },
                      }}
                    >
                      Списать XP
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                📅 История посещений
              </Typography>
              {mockVisitHistory.length > 0 ? (
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                  {mockVisitHistory.map((visit, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: '#222222', border: '1px solid #333333', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                            {visit.date}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#888888' }}>
                            {visit.location} • {visit.duration}
                          </Typography>
                        </Box>
                        <Chip 
                          label={visit.type} 
                          size="small"
                          sx={{ 
                            backgroundColor: visit.type === 'Вход' ? '#007AFF' : '#34C759',
                            color: '#ffffff'
                          }}
                        />
                      </Box>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#888888', textAlign: 'center', py: 4 }}>
                  Нет истории посещений
                </Typography>
              )}
            </Box>
          )}

          {tabValue === 2 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                💰 История XP
              </Typography>
              {mockXPHistory.length > 0 ? (
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                  {mockXPHistory.map((record, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: '#222222', border: '1px solid #333333', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                            {record.date}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#888888' }}>
                            {record.operation} • {record.reason}
                          </Typography>
                        </Box>
                        <Chip 
                          label={record.value} 
                          size="small"
                          sx={{ 
                            backgroundColor: record.value.startsWith('+') ? '#34C759' : '#FF3B30',
                            color: '#ffffff'
                          }}
                        />
                      </Box>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#888888', textAlign: 'center', py: 4 }}>
                  Нет истории XP
                </Typography>
              )}
            </Box>
          )}

          {tabValue === 3 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                🔧 Административные действия
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleToggleAdmin}
                    startIcon={selectedUser?.isAdmin ? <PersonOff /> : <AdminPanelSettings />}
                    sx={{
                      backgroundColor: selectedUser?.isAdmin ? '#FF3B30' : '#007AFF',
                      color: '#ffffff',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: selectedUser?.isAdmin ? '#FF5C4D' : '#3395FF',
                      },
                    }}
                  >
                    {selectedUser?.isAdmin ? 'Убрать админа' : 'Сделать админом'}
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleToggleBan}
                    startIcon={selectedUser?.isBanned ? <History /> : <PersonOff />}
                    sx={{
                      backgroundColor: selectedUser?.isBanned ? '#34C759' : '#FF3B30',
                      color: '#ffffff',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: selectedUser?.isBanned ? '#4CD964' : '#FF5C4D',
                      },
                    }}
                  >
                    {selectedUser?.isBanned ? 'Разблокировать' : 'Заблокировать'}
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, p: 2, backgroundColor: '#222222', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: '#888888', mb: 1 }}>
                  Текущий статус:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Chip 
                    label={selectedUser?.isBanned ? 'Забанен' : 'Активен'} 
                    color={selectedUser?.isBanned ? 'error' : 'success'}
                    variant="outlined"
                  />
                  <Chip 
                    label={selectedUser?.isAdmin ? 'Админ' : 'Пользователь'} 
                    color={selectedUser?.isAdmin ? 'warning' : 'default'}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>
          )}

          {tabValue === 4 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                Заметки админа
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Введите заметки о пользователе..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#333333' },
                    '&:hover fieldset': { borderColor: '#444444' },
                  },
                  '& .MuiInputLabel-root': { color: '#888888' },
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained"
                  sx={{
                    backgroundColor: '#333333',
                    color: '#ffffff',
                    '&:hover': { backgroundColor: '#444444' },
                  }}
                  onClick={() => console.log('Notes saved:', adminNotes)}
                >
                  Сохранить заметки
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#888888' }}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;