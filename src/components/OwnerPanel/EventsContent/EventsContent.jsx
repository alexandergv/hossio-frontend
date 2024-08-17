import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, DatePicker, Select } from 'antd';
import axiosConfig from 'services/axiosConfig';
import moment from 'moment';
import './EventsContent.css';

const { TextArea } = Input;
const { Option } = Select;

const EventsContent = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    // Obtener eventos y promociones desde el backend
    axiosConfig.get('/events/latest')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const showModal = (event) => {
    setCurrentEvent(event || {});
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (currentEvent?.id) {
      // Editar evento existente
      axiosConfig.put(`/api/events/${currentEvent.id}`, currentEvent)
        .then(response => {
          setEvents(events.map(event => event.id === response.data.id ? response.data : event));
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error updating event:', error));
    } else {
      // Crear nuevo evento
      axiosConfig.post('events/create', currentEvent)
        .then(response => {
          setEvents([...events, response.data]);
          setIsModalVisible(false);
        })
        .catch(error => console.error('Error creating event:', error));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentEvent(null);
  };

  const handleChange = (key, value) => {
    setCurrentEvent({ ...currentEvent, [key]: value });
  };

  return (
    <div className="events-content-container">
      <h1>Eventos y Promociones</h1>
      <Button className="add-event-button" type="primary" onClick={() => showModal()}>
        Añadir Evento/Promoción
      </Button>
      <ul className="events-list">
        {events.map(event => (
          <li key={event.id}>
            {event.title} - {moment(event.startDate).format('LL')} - {moment(event.endDate).format('LL')}
            <Button onClick={() => showModal(event)}>Editar</Button>
          </li>
        ))}
      </ul>

      <Modal 
        title="Añadir/Editar Evento" 
        open={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Título">
            <Input 
              value={currentEvent?.title} 
              onChange={e => handleChange('title', e.target.value)} 
            />
          </Form.Item>
          <Form.Item label="Fecha de Inicio">
            <DatePicker 
              value={currentEvent?.startDate ? moment(currentEvent.startDate) : null} 
              onChange={date => handleChange('startDate', date?.toISOString())} 
            />
          </Form.Item>
          <Form.Item label="Fecha de Fin">
            <DatePicker 
              value={currentEvent?.endDate ? moment(currentEvent.endDate) : null} 
              onChange={date => handleChange('endDate', date?.toISOString())} 
            />
          </Form.Item>
          <Form.Item label="Descripción">
            <TextArea 
              value={currentEvent?.description} 
              onChange={e => handleChange('description', e.target.value)} 
            />
          </Form.Item>
          <Form.Item label="Tipo">
            <Select 
              value={currentEvent?.type} 
              onChange={value => handleChange('type', value)} 
            >
              <Option value="descuento">Descuento</Option>
              <Option value="promocion">Promoción</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventsContent;
