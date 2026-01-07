import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Device {
  id: string;
  name: string;
  consumption: string;
  isOn: boolean;
}

export interface Group {
  id: string;
  name: string;
  connected: string;
  consumption: string;
  devices: Device[];
}

interface GroupsContextType {
  groups: Group[];
  allDevices: Device[];
  addGroup: (group: Omit<Group, 'id'>) => void;
  removeGroup: (id: string) => void;
  addDeviceToGroup: (groupId: string, device: Device) => void;
  removeDeviceFromGroup: (groupId: string, deviceId: string) => void;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error('useGroups must be used within a GroupsProvider');
  }
  return context;
};

interface GroupsProviderProps {
  children: ReactNode;
}

export const GroupsProvider: React.FC<GroupsProviderProps> = ({ children }) => {
  const allDevices: Device[] = [
    { id: '1', name: 'Geladeira', consumption: '2.0 kWh', isOn: false },
    { id: '2', name: 'Fogão', consumption: '1.5 kWh', isOn: false },
    { id: '3', name: 'Microondas', consumption: '1.2 kWh', isOn: false },
    { id: '4', name: 'Lava-louças', consumption: '1.1 kWh', isOn: false },
    { id: '5', name: 'Ar-condicionado', consumption: '3.0 kWh', isOn: false },
    { id: '6', name: 'Lampada', consumption: '0.8 kWh', isOn: false },
    { id: '7', name: 'Televisão', consumption: '2.0 kWh', isOn: false },
    { id: '8', name: 'Smart TV', consumption: '2.5 kWh', isOn: false },
    { id: '9', name: 'Som', consumption: '1.0 kWh', isOn: false },
    { id: '10', name: 'Ventilador', consumption: '0.8 kWh', isOn: false },
  ];

  const [groups, setGroups] = useState<Group[]>([
    { 
      id: '1', 
      name: 'Cozinha', 
      connected: '4/4', 
      consumption: '5.8 kWh',
      devices: [
        { id: '1', name: 'Geladeira', consumption: '2.0 kWh', isOn: true },
        { id: '2', name: 'Fogão', consumption: '1.5 kWh', isOn: false },
        { id: '3', name: 'Microondas', consumption: '1.2 kWh', isOn: true },
        { id: '4', name: 'Lava-louças', consumption: '1.1 kWh', isOn: false },
      ]
    },
    { 
      id: '2', 
      name: 'Quarto', 
      connected: '3/3', 
      consumption: '5.8 kWh',
      devices: [
        { id: '5', name: 'Ar-condicionado', consumption: '3.0 kWh', isOn: true },
        { id: '6', name: 'Lampada', consumption: '0.8 kWh', isOn: false },
        { id: '7', name: 'Televisão', consumption: '2.0 kWh', isOn: true },
      ]
    },
    { 
      id: '3', 
      name: 'Sala', 
      connected: '3/5', 
      consumption: '5.8 kWh',
      devices: [
        { id: '8', name: 'Smart TV', consumption: '2.5 kWh', isOn: true },
        { id: '9', name: 'Som', consumption: '1.0 kWh', isOn: false },
        { id: '10', name: 'Ventilador', consumption: '0.8 kWh', isOn: true },
      ]
    },
  ]);

  const addGroup = (newGroup: Omit<Group, 'id'>) => {
    const id = (groups.length + 1).toString();
    setGroups([...groups, { ...newGroup, id }]);
  };

  const removeGroup = (id: string) => {
    setGroups(groups.filter(group => group.id !== id));
  };

  const addDeviceToGroup = (groupId: string, device: Device) => {
    setGroups(groups.map(group =>
      group.id === groupId
        ? { ...group, devices: [...group.devices, device] }
        : group
    ));
  };

  const removeDeviceFromGroup = (groupId: string, deviceId: string) => {
    setGroups(groups.map(group =>
      group.id === groupId
        ? { ...group, devices: group.devices.filter(d => d.id !== deviceId) }
        : group
    ));
  };

  return (
    <GroupsContext.Provider value={{ groups, allDevices, addGroup, removeGroup, addDeviceToGroup, removeDeviceFromGroup }}>
      {children}
    </GroupsContext.Provider>
  );
};