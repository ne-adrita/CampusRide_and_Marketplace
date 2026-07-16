import { loadJSON, saveJSON, seedRides, generateId, IS_PREVIEW } from '../data';

const delay = () => new Promise(r => setTimeout(r, 30));

export async function getRides(params = {}) {
  if (IS_PREVIEW) {
    await delay();
    let rides = loadJSON('rides', seedRides);

    if (params.search) {
      const s = params.search.toLowerCase();
      rides = rides.filter(r => r.origin.toLowerCase().includes(s) || r.destination.toLowerCase().includes(s));
    }
    if (params.origin) rides = rides.filter(r => r.origin.toLowerCase().includes(params.origin.toLowerCase()));
    if (params.destination) rides = rides.filter(r => r.destination.toLowerCase().includes(params.destination.toLowerCase()));
    if (params.date) rides = rides.filter(r => r.date_time.startsWith(params.date));
    if (params.maxPrice) rides = rides.filter(r => r.fare_per_seat <= Number(params.maxPrice));

    if (params.sort === 'price_asc') rides.sort((a, b) => a.fare_per_seat - b.fare_per_seat);
    else if (params.sort === 'price_desc') rides.sort((a, b) => b.fare_per_seat - a.fare_per_seat);
    else rides.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 20;
    const total = rides.length;
    const pages = Math.ceil(total / limit);
    const paginated = rides.slice((page - 1) * limit, page * limit);

    return { data: { rides: paginated, pagination: { page, limit, total, pages } } };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/rides', { params });
  return { data: response.data };
}

export async function getRideById(id) {
  if (IS_PREVIEW) {
    await delay();
    const rides = loadJSON('rides', seedRides);
    const ride = rides.find(r => r.ride_id === id);
    if (!ride) throw new Error('Ride not found');
    return { data: ride };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.get('/rides/' + id);
  return { data: response.data };
}

export async function createRide(data) {
  if (IS_PREVIEW) {
    await delay();
    const rides = loadJSON('rides', seedRides);
    const currentUser = loadJSON('currentUser', {});
    const newRide = {
      ride_id: generateId('ride_'),
      ...data,
      seats_total: Number(data.seats_total),
      seats_available: Number(data.seats_total),
      fare_per_seat: Number(data.fare_per_seat),
      driver_id: currentUser.user_id,
      driver_name: currentUser.name,
      driver_rating: currentUser.rating_avg || 0,
      status: 'active',
    };
    rides.unshift(newRide);
    saveJSON('rides', rides);
    return { data: newRide };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.post('/rides', data);
  return { data: response.data };
}

export async function updateRide(id, data) {
  if (IS_PREVIEW) {
    await delay();
    const rides = loadJSON('rides', seedRides);
    const idx = rides.findIndex(r => r.ride_id === id);
    if (idx === -1) throw new Error('Ride not found');
    rides[idx] = { ...rides[idx], ...data };
    saveJSON('rides', rides);
    return { data: rides[idx] };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.put('/rides/' + id, data);
  return { data: response.data };
}

export async function deleteRide(id) {
  if (IS_PREVIEW) {
    await delay();
    let rides = loadJSON('rides', seedRides);
    rides = rides.filter(r => r.ride_id !== id);
    saveJSON('rides', rides);
    return { data: { message: 'Ride deleted' } };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.delete('/rides/' + id);
  return { data: response.data };
}

export async function bookRide(id, seats = 1) {
  if (IS_PREVIEW) {
    await delay();
    const rides = loadJSON('rides', seedRides);
    const idx = rides.findIndex(r => r.ride_id === id);
    if (idx === -1) throw new Error('Ride not found');
    const currentUser = loadJSON('currentUser', {});
    if (rides[idx].driver_id === currentUser.user_id) throw new Error('You cannot book your own ride');
    if (rides[idx].seats_available < seats) throw new Error('Not enough seats available');
    rides[idx].seats_available -= seats;
    saveJSON('rides', rides);
    return { data: { message: 'Ride booked successfully!' } };
  }
  const { default: api } = await import('../api/axios');
  const response = await api.post('/rides/' + id + '/book', { seats });
  return { data: response.data };
}
