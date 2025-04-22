import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CasinoIcon from '@mui/icons-material/Casino';
import ClearIcon from '@mui/icons-material/Clear';

export default function PlacedBets({ placedBets, editBetAmount, removeBet, spinWheel, clearBets, isSpinning }) {
  const total = placedBets.reduce((acc, b) => acc + b.amount, 0);

  return (
    <Card sx={{ bgcolor: '#1e1e1e', color: 'white', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Placed Bets
        </Typography>

        {placedBets.length === 0 ? (
          <Typography variant="body2" color="gray">
            No bets placed yet.
          </Typography>
        ) : (
          <>
            <Table size="small" sx={{ color: 'white' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'gray' }}>Bet</TableCell>
                  <TableCell sx={{ color: 'gray' }}>Amount</TableCell>
                  <TableCell sx={{ color: 'gray' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {placedBets.map((b, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ color: 'white' }}>{b.bet}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        inputProps={{ min: 1 }}
                        value={b.amount}
                        onChange={(e) => editBetAmount(i, parseInt(e.target.value, 10) || 1)}
                        variant="outlined"
                        sx={{
                          width: 80,
                          input: { color: 'white' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#444' },
                            '&:hover fieldset': { borderColor: '#888' },
                            '&.Mui-focused fieldset': { borderColor: '#f44336' },
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeBet(i)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Typography variant="subtitle2" mt={2} color="gray">
              Total: ${total}
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button
                variant="contained"
                color="error"
                startIcon={<CasinoIcon />}
                onClick={spinWheel}
                disabled={isSpinning}
                sx={{ borderRadius: 2 }}
              >
                {isSpinning ? 'Spinning...' : 'Spin'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={clearBets}
                color="inherit"
                sx={{ borderColor: 'gray', color: 'gray', borderRadius: 2 }}
              >
                Clear All
              </Button>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
