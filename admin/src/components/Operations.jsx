import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  TextField,
  List,
  Chip,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useState } from 'react';
import { AdminPanelSettings, MeetingRoom, PersonAdd, Block, CheckCircle, AttachMoney } from '@mui/icons-material';

// --- ПОЛНЫЕ МОК-ДАННЫЕ ---

const mockPendingDonations = [
  {
    id: 1,
    user: 'sergey_smirnov',
    purpose: 'Чай и печенье',
    date: '25.10.2023 14:40',
  },
  {
    id: 2,
    user: 'elena_kuznetsova',
    purpose: 'Наклейки для декора',
    date: '25.10.2023 13:20',
  },
  {
    id: 3,
    user: 'pavel_volkov',
    purpose: 'Новые маркеры для доски',
    date: '25.10.2023 11:05',
  },
];

const mockAdmins = [
  { id: 1, username: 'admin_main', role: 'Главный админ', status: 'active', lastActive: '25.10.2023 15:30' },
  { id: 2, username: 'admin_helper', role: 'Модератор', status: 'active', lastActive: '25.10.2023 14:15' },
  { id: 3, username: 'admin_old', role: 'Админ', status: 'inactive', lastActive: '24.10.2023 12:00' },
];

// --- КОМПОНЕНТ ---

const Operations = () => {
  const [pendingDonations, setPendingDonations] = useState(mockPendingDonations);
  const [admins, setAdmins] = useState(mockAdmins);
  const [coworkingOpen, setCoworkingOpen] = useState(true);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Модератор');

  const handleApprove = (id) => {
    console.log(`Approved donation ${id}, +50 XP awarded`);
    setPendingDonations(pendingDonations.filter(d => d.id !== id));
  };

  const handleReject = (id) => {
    console.log(`Rejected donation ${id}`);
    setPendingDonations(pendingDonations.filter(d => d.id !== id));
  };

  const handleToggleAdminStatus = (adminId) => {
    setAdmins(admins.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' }
        : admin
    ));
  };

  const handleAddAdmin = () => {
    if (!newAdminUsername) return;
    
    const newAdmin = {
      id: admins.length + 1,
      username: newAdminUsername,
      role: newAdminRole,
      status: 'active',
      lastActive: new Date().toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })
    };
    
    setAdmins([...admins, newAdmin]);
    setNewAdminUsername('');
    setNewAdminRole('Модератор');
  };

  // Объект со стилями для всех карточек, чтобы избежать дублирования
  const cardStyles = {
    backgroundColor: '#1C1C1E',
    border: '1px solid #333333',
    borderRadius: 3,
    height: '100%', // <-- КЛЮЧЕВОЙ ФИКС: Заставляет карточку растягиваться
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#000000', minHeight: '100vh' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          color: '#FFFFFF', 
          fontWeight: 700,
        }}
      >
        ⚙️ Операции и управление
      </Typography>

      <Grid container spacing={3}>
        
        {/* БЛОК 1: Статус коворкинга */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MeetingRoom sx={{ color: '#007AFF', mr: 1.5 }} />
                <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  Статус коворкинга
                </Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={coworkingOpen}
                    onChange={(e) => setCoworkingOpen(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#007AFF' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#007AFF' },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#E0E0E0' }}>
                    {coworkingOpen ? 'Открыт для посещений' : 'Закрыт'}
                  </Typography>
                }
              />
              
              <Typography variant="body2" sx={{ color: '#888888', mt: 1 }}>
                {coworkingOpen 
                  ? 'Пользователи могут отмечаться в коворкинге' 
                  : 'Возможность отметиться в коворкинге отключена'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* БЛОК 2: Добавить администратора */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AdminPanelSettings sx={{ color: '#FF9500', mr: 1.5 }} />
                  <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                    Добавить администратора
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={newAdminUsername}
                    onChange={(e) => setNewAdminUsername(e.target.value)}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': { color: '#FFFFFF', '& fieldset': { borderColor: '#333333' }, '&:hover fieldset': { borderColor: '#444444' } },
                      '& .MuiInputLabel-root': { color: '#888888' },
                    }}
                  />
                  
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel sx={{ color: '#888888' }}>Роль</InputLabel>
                    <Select
                      value={newAdminRole}
                      onChange={(e) => setNewAdminRole(e.target.value)}
                      label="Роль"
                      sx={{
                        color: '#FFFFFF',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333333' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444444' },
                        '& .MuiSvgIcon-root': { color: '#888888' },
                      }}
                    >
                      <MenuItem value="Модератор">Модератор</MenuItem>
                      <MenuItem value="Админ">Админ</MenuItem>
                      <MenuItem value="Главный админ">Главный админ</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              
              <Button
                variant="contained"
                onClick={handleAddAdmin}
                fullWidth
                sx={{
                  backgroundColor: '#FF9500', color: '#000000', fontWeight: 600,
                  '&:hover': { backgroundColor: '#FFB347' },
                }}
              >
                <PersonAdd sx={{ mr: 1 }} />
                Добавить
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* БЛОК 3: Ожидающие донаты */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoney sx={{ color: '#34C759', mr: 1.5 }} />
                  <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                    Ожидающие донаты ({pendingDonations.length})
                  </Typography>
              </Box>
              
              {pendingDonations.length === 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography sx={{ color: '#888888', textAlign: 'center' }}>
                    Нет ожидающих донатов
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {pendingDonations.map((donation) => (
                      <Paper key={donation.id} sx={{ p: 2, backgroundColor: '#2C2C2E', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <Box>
                            <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>{donation.user}</Typography>
                            <Typography sx={{ color: '#E0E0E0', fontSize: '0.875rem' }}>{donation.purpose}</Typography>
                            <Typography sx={{ color: '#888888', fontSize: '0.75rem' }}>{donation.date}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Button size="small" variant="contained" onClick={() => handleApprove(donation.id)} sx={{ backgroundColor: '#34C759', color: '#000', '&:hover': {backgroundColor: '#30B050'} }}>
                            <CheckCircle sx={{ fontSize: 16, mr: 0.5 }} /> Одобрить
                          </Button>
                          <Button size="small" variant="outlined" onClick={() => handleReject(donation.id)} sx={{ borderColor: '#FF3B30', color: '#FF3B30', '&:hover': {borderColor: '#FF3B30', backgroundColor: '#FF3B3020'} }}>
                            <Block sx={{ fontSize: 16, mr: 0.5 }} /> Отклонить
                          </Button>
                        </Box>
                      </Paper>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* БЛОК 4: Список Администраторов */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2, fontWeight: 600 }}>
                    Администраторы ({admins.length})
                </Typography>
              <List sx={{ p: 0 }}>
                {admins.map((admin) => (
                  <Paper key={admin.id} sx={{ mb: 2, p: 2, backgroundColor: '#2C2C2E', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>{admin.username}</Typography>
                        <Typography sx={{ color: '#888888', fontSize: '0.875rem' }}>{admin.role} • {admin.lastActive}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={admin.status === 'active' ? 'Активен' : 'Неактивен'}
                          size="small"
                          sx={{
                            backgroundColor: admin.status === 'active' ? '#34C75930' : '#FF3B3030',
                            color: admin.status === 'active' ? '#34C759' : '#FF3B30',
                          }}
                        />
                        <Button size="small" variant="text" onClick={() => handleToggleAdminStatus(admin.id)} sx={{ color: '#007AFF', minWidth: 'auto' }}>
                          {admin.status === 'active' ? 'Блок' : 'Разблок'}
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Operations;