import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Switch,
  FormControlLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import {
  CheckCircle,
  Block,
  Visibility,
  Delete,
  Reply,
  Flag,
  FilterList,
  Search,
  MoreVert,
} from '@mui/icons-material';

// Mock message data
const mockMessages = [
  {
    id: 1,
    userId: 101,
    username: 'TechGuru2024',
    avatar: '/avatars/1.jpg',
    message: 'This platform is amazing! The new features are incredible.',
    timestamp: '2024-01-15 14:30:00',
    status: 'pending',
    type: 'review',
    reportedCount: 0,
    likes: 15,
    contentType: 'text',
  },
  {
    id: 2,
    userId: 102,
    username: 'CryptoQueen',
    avatar: '/avatars/2.jpg',
    message: 'Check out this new crypto scam, guaranteed 1000% returns! DM me for details.',
    timestamp: '2024-01-15 13:45:00',
    status: 'flagged',
    type: 'spam',
    reportedCount: 12,
    likes: 2,
    contentType: 'text',
  },
  {
    id: 3,
    userId: 103,
    username: 'DesignMaster',
    avatar: '/avatars/3.jpg',
    message: 'Love the new UI updates! The glassmorphism design is stunning.',
    timestamp: '2024-01-15 12:20:00',
    status: 'approved',
    type: 'review',
    reportedCount: 0,
    likes: 28,
    contentType: 'text',
  },
  {
    id: 4,
    userId: 104,
    username: 'CodeNinja',
    avatar: '/avatars/4.jpg',
    message: 'This is absolute garbage. The developers have no idea what they\'re doing.',
    timestamp: '2024-01-15 11:15:00',
    status: 'flagged',
    type: 'harassment',
    reportedCount: 8,
    likes: 1,
    contentType: 'text',
  },
  {
    id: 5,
    userId: 105,
    username: 'StartupLife',
    avatar: '/avatars/5.jpg',
    message: 'Just launched my new app! Would love some feedback from this community.',
    timestamp: '2024-01-15 10:30:00',
    status: 'pending',
    type: 'promotion',
    reportedCount: 1,
    likes: 45,
    contentType: 'text',
  },
  {
    id: 6,
    userId: 106,
    username: 'AIEnthusiast',
    avatar: '/avatars/6.jpg',
    message: 'AI is going to replace all developers by next year. Mark my words!',
    timestamp: '2024-01-15 09:45:00',
    status: 'flagged',
    type: 'misinformation',
    reportedCount: 15,
    likes: 5,
    contentType: 'text',
  },
];

const MessageModeration = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [autoModeration, setAutoModeration] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'flagged': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved': return 'Одобрено';
      case 'flagged': return 'Помечено';
      case 'pending': return 'Ожидает';
      default: return status;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'spam': return 'error';
      case 'harassment': return 'error';
      case 'misinformation': return 'warning';
      case 'promotion': return 'info';
      case 'review': return 'success';
      default: return 'default';
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || message.status === filter || message.type === filter;
    const matchesSearch = searchTerm === '' || 
      message.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (messageId, newStatus) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: newStatus } : msg
    ));
  };

  const handleDelete = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleViewDetails = (message) => {
    setSelectedMessage(message);
    setOpenDetailDialog(true);
  };

  const handleReply = () => {
    console.log('Replying to message:', selectedMessage.id, 'with:', replyText);
    setOpenReplyDialog(false);
    setReplyText('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stats = {
    total: messages.length,
    pending: messages.filter(m => m.status === 'pending').length,
    flagged: messages.filter(m => m.status === 'flagged').length,
    approved: messages.filter(m => m.status === 'approved').length,
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
        🛡️ Модерация сообщений
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: '#1C1C1E',
            border: '1px solid #333333',
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ color: '#007AFF', fontWeight: 600, mb: 1 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontSize: '0.875rem' }}>
                Всего сообщений
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: '#1C1C1E',
            border: '1px solid #333333',
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ color: '#FF9500', fontWeight: 600, mb: 1 }}>
                {stats.pending}
              </Typography>
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontSize: '0.875rem' }}>
                Ожидают проверки
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: '#1C1C1E',
            border: '1px solid #333333',
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ color: '#FF3B30', fontWeight: 600, mb: 1 }}>
                {stats.flagged}
              </Typography>
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontSize: '0.875rem' }}>
                Помечено
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            backgroundColor: '#1C1C1E',
            border: '1px solid #333333',
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ color: '#34C759', fontWeight: 600, mb: 1 }}>
                {stats.approved}
              </Typography>
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontSize: '0.875rem' }}>
                Одобрено
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Auto-moderation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: '#E0E0E0' }}>Фильтр</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Фильтр"
              sx={{
                color: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#333333',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#007AFF',
                },
              }}
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="pending">Ожидают</MenuItem>
              <MenuItem value="flagged">Помечены</MenuItem>
              <MenuItem value="approved">Одобрены</MenuItem>
              <MenuItem value="spam">Спам</MenuItem>
              <MenuItem value="harassment">Домогательство</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: '#E0E0E0', fontSize: 20 }} />,
            }}
            sx={{
              color: '#FFFFFF',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#333333',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#007AFF',
              },
              minWidth: 200,
            }}
          />
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={autoModeration}
              onChange={(e) => setAutoModeration(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#007AFF',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#007AFF',
                },
              }}
            />
          }
          label="Авто-модерация"
          sx={{ color: '#E0E0E0' }}
        />
      </Box>

      {/* Messages Table */}
      <Card sx={{ 
        backgroundColor: '#1C1C1E',
        border: '1px solid #333333',
        borderRadius: 2,
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#111111' }}>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 600 }}>Пользователь</TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 600 }}>Сообщение</TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 600 }}>Статус</TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 600 }}>Тип</TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 600 }}>Жалобы</TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 600 }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMessages
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((message) => (
                <TableRow 
                  key={message.id} 
                  sx={{ 
                    '&:hover': { backgroundColor: '#222222' },
                    borderBottom: '1px solid #333333'
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar 
                        src={message.avatar} 
                        sx={{ width: 32, height: 32, backgroundColor: '#333333' }}
                      >
                        {message.username[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                          {message.username}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#888888' }}>
                          {message.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#E0E0E0', 
                        maxWidth: 300,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {message.message}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getStatusLabel(message.status)} 
                      color={getStatusColor(message.status)}
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        height: 24,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={message.type}
                      color={getTypeColor(message.type)}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.75rem',
                        height: 24,
                        borderColor: '#555555',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                      {message.reportedCount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewDetails(message)}
                        sx={{ 
                          color: '#007AFF',
                          '&:hover': { backgroundColor: '#007AFF20' }
                        }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleStatusChange(message.id, 'approved')}
                        sx={{ 
                          color: '#34C759',
                          '&:hover': { backgroundColor: '#34C75920' }
                        }}
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleStatusChange(message.id, 'flagged')}
                        sx={{ 
                          color: '#FF9500',
                          '&:hover': { backgroundColor: '#FF950020' }
                        }}
                      >
                        <Flag />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(message.id)}
                        sx={{ 
                          color: '#FF3B30',
                          '&:hover': { backgroundColor: '#FF3B3020' }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMessages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ 
            color: '#E0E0E0',
            '& .MuiTablePagination-select': {
              color: '#FFFFFF',
            },
            '& .MuiTablePagination-selectIcon': {
              color: '#E0E0E0',
            },
          }}
        />
      </Card>

      {/* Message Detail Dialog */}
      <Dialog 
        open={openDetailDialog} 
        onClose={() => setOpenDetailDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1C1C1E',
            border: '1px solid #333333',
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ color: '#FFFFFF', borderBottom: '1px solid #333333' }}>
          Детали сообщения
        </DialogTitle>
        <DialogContent sx={{ color: '#FFFFFF' }}>
          {selectedMessage && (
            <Box sx={{ pt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar 
                  src={selectedMessage.avatar} 
                  sx={{ width: 48, height: 48, backgroundColor: '#333333' }}
                >
                  {selectedMessage.username[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                    {selectedMessage.username}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#888888' }}>
                    {selectedMessage.timestamp}
                  </Typography>
                </Box>
              </Box>
              <Paper sx={{ p: 2, mb: 2, backgroundColor: '#111111', border: '1px solid #333333' }}>
                <Typography variant="body1" sx={{ color: '#E0E0E0' }}>
                  {selectedMessage.message}
                </Typography>
              </Paper>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={`Лайки: ${selectedMessage.likes}`} 
                  variant="outlined" 
                  sx={{ borderColor: '#555555', color: '#E0E0E0' }}
                />
                <Chip 
                  label={`Жалобы: ${selectedMessage.reportedCount}`} 
                  color="error" 
                  variant="outlined" 
                />
                <Chip 
                  label={getStatusLabel(selectedMessage.status)} 
                  color={getStatusColor(selectedMessage.status)} 
                />
                <Chip 
                  label={selectedMessage.type} 
                  color={getTypeColor(selectedMessage.type)} 
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #333333', p: 2 }}>
          <Button 
            onClick={() => setOpenDetailDialog(false)} 
            sx={{ color: '#E0E0E0' }}
          >
            Закрыть
          </Button>
          <Button 
            onClick={() => {
              setOpenDetailDialog(false);
              setOpenReplyDialog(true);
            }}
            variant="contained"
            sx={{ 
              backgroundColor: '#007AFF',
              '&:hover': { backgroundColor: '#0051D5' },
              textTransform: 'none',
              borderRadius: 1,
            }}
          >
            Ответить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog 
        open={openReplyDialog} 
        onClose={() => setOpenReplyDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1C1C1E',
            border: '1px solid #333333',
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ color: '#FFFFFF', borderBottom: '1px solid #333333' }}>
          Ответ пользователю
        </DialogTitle>
        <DialogContent sx={{ color: '#FFFFFF' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Сообщение"
            fullWidth
            multiline
            rows={4}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': {
                  borderColor: '#333333',
                },
                '&:hover fieldset': {
                  borderColor: '#007AFF',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#888888',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #333333', p: 2 }}>
          <Button 
            onClick={() => setOpenReplyDialog(false)} 
            sx={{ color: '#E0E0E0' }}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleReply}
            variant="contained"
            sx={{ 
              backgroundColor: '#007AFF',
              '&:hover': { backgroundColor: '#0051D5' },
              textTransform: 'none',
              borderRadius: 1,
            }}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MessageModeration;