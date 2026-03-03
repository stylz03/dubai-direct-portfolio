import React, { useState } from 'react';
import { Car, MapPin, Calendar, CheckSquare, Search } from 'lucide-react';

const vehicles = [
    { id: 1, name: 'Toyota Camry 2024', type: 'Sedan', status: 'Available', loc: 'Downtown Hub', price: '$45/day' },
    { id: 2, name: 'Ford Transit Van', type: 'Cargo', status: 'Booked', loc: 'Airport South', price: '$85/day' },
    { id: 3, name: 'Tesla Model 3', type: 'EV Sedan', status: 'Maintenance', loc: 'HQ Workshop', price: '$90/day' },
    { id: 4, name: 'Honda CR-V', type: 'SUV', status: 'Available', loc: 'North Station', price: '$65/day' },
];

const FleetDemo: React.FC = () => {
    const [fleet, setFleet] = useState(vehicles);
    const [bookingDetails, setBookingDetails] = useState<{ id: number, loading: boolean } | null>(null);

    const handleBook = (id: number) => {
        setBookingDetails({ id, loading: true });

        // Simulating API call for booking
        setTimeout(() => {
            setFleet(prev => prev.map(v => v.id === id ? { ...v, status: 'Booked' } : v));
            setBookingDetails(null);
        }, 1200);
    };

    return (
        <div className="bg-gray-50 text-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[480px]">
            {/* Top Bar */}
            <div className="bg-indigo-700 text-white p-4 flex justify-between items-center shadow-md z-10">
                <h3 className="font-bold flex items-center gap-2">
                    <Car className="h-5 w-5" /> FleetOps Dash
                </h3>
                <div className="bg-white/20 rounded-full px-3 py-1 text-xs flex items-center gap-2 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div> System Online
                </div>
            </div>

            {/* Sub-header / Search */}
            <div className="bg-white border-b px-4 py-3 flex gap-4 shadow-sm z-0">
                <div className="flex-1 relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search vehicles, reg numbers..."
                        className="w-full bg-gray-100 border-none rounded-md pl-9 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <button className="bg-gray-100 p-1.5 rounded-md text-gray-600 hover:bg-gray-200"><Calendar className="h-4 w-4" /></button>
            </div>

            {/* Fleet List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="grid gap-4">
                    {fleet.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-gray-800">{vehicle.name}</h4>
                                    <span className="text-xs text-gray-500">{vehicle.type}</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${vehicle.status === 'Available' ? 'bg-green-100 text-green-700' :
                                        vehicle.status === 'Booked' ? 'bg-indigo-100 text-indigo-700' :
                                            'bg-orange-100 text-orange-700'
                                    }`}>
                                    {vehicle.status}
                                </span>
                            </div>

                            <div className="flex justify-between items-end mt-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                        <MapPin className="h-3 w-3" /> {vehicle.loc}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                                        {vehicle.price}
                                    </div>
                                </div>

                                {vehicle.status === 'Available' && (
                                    <button
                                        onClick={() => handleBook(vehicle.id)}
                                        disabled={bookingDetails?.id === vehicle.id}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2 rounded transition-colors disabled:opacity-70 flex items-center gap-1"
                                    >
                                        {bookingDetails?.id === vehicle.id ? (
                                            <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Reserving...</>
                                        ) : 'Reserve Asset'}
                                    </button>
                                )}
                                {vehicle.status === 'Booked' && (
                                    <button className="bg-gray-100 text-gray-500 text-xs font-medium px-4 py-2 rounded flex items-center gap-1 cursor-default">
                                        <CheckSquare className="h-3 w-3" /> Active
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FleetDemo;
