import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Home, DollarSign, Users, Calendar, X, Check, Clock, Package, Star } from 'lucide-react';

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedType, setSelectedType] = useState('ALL');
    const [selectedAvailability, setSelectedAvailability] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const mockRooms = [
                {
                    id: 1,
                    hotel_id: 1,
                    hotel_name: "Sunrise Hotel",
                    room_number: "301",
                    images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
                    type: "suite",
                    price_per_night: 250.00,
                    capacity: 3,
                    is_available: true,
                    created_at: "2024-01-15T10:30:00",
                    updated_at: "2024-01-15T10:30:00"
                },
                {
                    id: 2,
                    hotel_id: 1,
                    hotel_name: "Sunrise Hotel",
                    room_number: "205",
                    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400"],
                    type: "double",
                    price_per_night: 150.00,
                    capacity: 2,
                    is_available: true,
                    created_at: "2024-01-16T11:00:00",
                    updated_at: "2024-01-20T14:30:00"
                },
                {
                    id: 3,
                    hotel_id: 2,
                    hotel_name: "Ocean View Hotel",
                    room_number: "102",
                    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400"],
                    type: "single",
                    price_per_night: 100.00,
                    capacity: 1,
                    is_available: false,
                    created_at: "2024-01-17T12:00:00",
                    updated_at: "2024-01-25T09:15:00"
                },
                {
                    id: 4,
                    hotel_id: 3,
                    hotel_name: "Mountain Resort",
                    room_number: "401",
                    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"],
                    type: "family",
                    price_per_night: 350.00,
                    capacity: 4,
                    is_available: true,
                    created_at: "2024-01-18T13:00:00",
                    updated_at: "2024-01-18T13:00:00"
                },
                {
                    id: 5,
                    hotel_id: 2,
                    hotel_name: "Ocean View Hotel",
                    room_number: "503",
                    images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400"],
                    type: "suite",
                    price_per_night: 300.00,
                    capacity: 3,
                    is_available: true,
                    created_at: "2024-01-19T14:00:00",
                    updated_at: "2024-01-22T16:45:00"
                },
                {
                    id: 6,
                    hotel_id: 4,
                    hotel_name: "City Center Hotel",
                    room_number: "201",
                    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400"],
                    type: "double",
                    price_per_night: 120.00,
                    capacity: 2,
                    is_available: false,
                    created_at: "2024-01-20T15:00:00",
                    updated_at: "2024-01-20T15:00:00"
                }
            ];
            setRooms(mockRooms);
            setFilteredRooms(mockRooms);
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        filterRooms();
    }, [selectedType, selectedAvailability, searchTerm, rooms]);

    const filterRooms = () => {
        let filtered = rooms;

        // Filter by type
        if (selectedType !== 'ALL') {
            filtered = filtered.filter(room => room.type === selectedType);
        }

        // Filter by availability
        if (selectedAvailability !== 'ALL') {
            filtered = filtered.filter(room => 
                selectedAvailability === 'AVAILABLE' ? room.is_available : !room.is_available
            );
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(room =>
                room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.id.toString().includes(searchTerm)
            );
        }

        setFilteredRooms(filtered);
    };

    const deleteRoom = async (roomId) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setRooms(rooms.filter(room => room.id !== roomId));
            setIsLoading(false);
            setShowDeleteModal(false);
            setSelectedRoom(null);
        }, 500);
    };

    const updateRoom = async (roomData) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const updatedRooms = rooms.map(room =>
                room.id === roomData.id
                    ? { ...room, ...roomData, updated_at: new Date().toISOString() }
                    : room
            );
            setRooms(updatedRooms);
            setIsLoading(false);
            setShowEditModal(false);
            setEditingRoom(null);
        }, 500);
    };

    const toggleAvailability = async (roomId) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const updatedRooms = rooms.map(room =>
                room.id === roomId
                    ? { ...room, is_available: !room.is_available, updated_at: new Date().toISOString() }
                    : room
            );
            setRooms(updatedRooms);
            setIsLoading(false);
        }, 300);
    };

    const getTypeColor = (type) => {
        const colors = {
            single: 'bg-blue-100 text-blue-800 border-blue-200',
            double: 'bg-green-100 text-green-800 border-green-200',
            suite: 'bg-purple-100 text-purple-800 border-purple-200',
            family: 'bg-orange-100 text-orange-800 border-orange-200'
        };
        return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getTypeIcon = (type) => {
        const icons = {
            single: <Users className="w-4 h-4" />,
            double: <Users className="w-4 h-4" />,
            suite: <Star className="w-4 h-4" />,
            family: <Users className="w-4 h-4" />
        };
        return icons[type];
    };

    const getTypeText = (type) => {
        const texts = {
            single: 'Phòng đơn',
            double: 'Phòng đôi',
            suite: 'Suite',
            family: 'Phòng gia đình'
        };
        return texts[type];
    };

    const getAvailabilityColor = (isAvailable) => {
        return isAvailable 
            ? 'bg-green-100 text-green-800 border-green-200' 
            : 'bg-red-100 text-red-800 border-red-200';
    };

    const getAvailabilityText = (isAvailable) => {
        return isAvailable ? 'Có sẵn' : 'Đã thuê';
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const stats = {
        total: rooms.length,
        available: rooms.filter(r => r.is_available).length,
        occupied: rooms.filter(r => !r.is_available).length,
        suite: rooms.filter(r => r.type === 'suite').length,
        revenue: rooms.reduce((sum, room) => sum + room.price_per_night, 0)
    };

    const openEditModal = (room = null) => {
        setEditingRoom(room);
        setShowEditModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const roomData = {
            room_number: formData.get('room_number'),
            type: formData.get('type'),
            price_per_night: parseFloat(formData.get('price_per_night')),
            capacity: parseInt(formData.get('capacity')),
            is_available: formData.get('is_available') === 'true'
        };

        if (editingRoom) {
            roomData.id = editingRoom.id;
            updateRoom(roomData);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 lg:mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-4 lg:mb-0">
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Quản lý phòng</h1>
                            <p className="text-gray-600">Quản lý và theo dõi tất cả phòng trong hệ thống</p>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4 lg:p-6 border-l-4 border-gray-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm text-gray-600 mb-1">Tổng phòng</p>
                                <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <Package className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 lg:p-6 border-l-4 border-green-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm text-gray-600 mb-1">Có sẵn</p>
                                <p className="text-lg lg:text-2xl font-bold text-green-600">{stats.available}</p>
                            </div>
                            <Check className="w-6 h-6 lg:w-8 lg:h-8 text-green-400" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 lg:p-6 border-l-4 border-red-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm text-gray-600 mb-1">Đã thuê</p>
                                <p className="text-lg lg:text-2xl font-bold text-red-600">{stats.occupied}</p>
                            </div>
                            <X className="w-6 h-6 lg:w-8 lg:h-8 text-red-400" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 lg:p-6 border-l-4 border-purple-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm text-gray-600 mb-1">Suite</p>
                                <p className="text-lg lg:text-2xl font-bold text-purple-600">{stats.suite}</p>
                            </div>
                            <Star className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 lg:p-6 border-l-4 border-blue-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm text-gray-600 mb-1">Tổng giá trị</p>
                                <p className="text-lg lg:text-2xl font-bold text-blue-600">{formatPrice(stats.revenue)}</p>
                            </div>
                            <DollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow p-4 lg:p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo số phòng, khách sạn, loại phòng..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
                            >
                                <option value="ALL">Tất cả loại phòng</option>
                                <option value="single">Phòng đơn</option>
                                <option value="double">Phòng đôi</option>
                                <option value="suite">Suite</option>
                                <option value="family">Phòng gia đình</option>
                            </select>

                            <select
                                value={selectedAvailability}
                                onChange={(e) => setSelectedAvailability(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
                            >
                                <option value="ALL">Tất cả trạng thái</option>
                                <option value="AVAILABLE">Có sẵn</option>
                                <option value="OCCUPIED">Đã thuê</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Rooms Grid */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-32 lg:h-64">
                            <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredRooms.length === 0 ? (
                        <div className="text-center py-8 lg:py-12">
                            <Package className="w-12 h-12 lg:w-16 lg:h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm lg:text-lg">Không tìm thấy phòng nào</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                            {filteredRooms.map(room => (
                                <div key={room.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    {/* Room Image */}
                                    <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                                        <img
                                            src={room.images[0]}
                                            alt={`Room ${room.room_number}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(room.is_available)}`}>
                                                {room.is_available ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                                {getAvailabilityText(room.is_available)}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm font-medium">
                                            {formatPrice(room.price_per_night)}/đêm
                                        </div>
                                    </div>

                                    {/* Room Info */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">Phòng {room.room_number}</h3>
                                                <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                                                    <Home className="w-4 h-4" />
                                                    {room.hotel_name}
                                                </p>
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(room.type)}`}>
                                                {getTypeIcon(room.type)}
                                                {getTypeText(room.type)}
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    Sức chứa:
                                                </span>
                                                <span className="font-medium">{room.capacity} người</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>ID phòng:</span>
                                                <span className="font-medium">#{room.id}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>ID khách sạn:</span>
                                                <span className="font-medium">#{room.hotel_id}</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                                            <button
                                                onClick={() => {
                                                    setSelectedRoom(room);
                                                    setShowModal(true);
                                                }}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded text-sm transition-colors"
                                            >
                                                <Eye className="w-4 h-4 inline mr-1" />
                                                Chi tiết
                                            </button>
                                            <button
                                                onClick={() => openEditModal(room)}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded text-sm transition-colors"
                                            >
                                                <Edit className="w-4 h-4 inline mr-1" />
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => toggleAvailability(room.id)}
                                                className={`flex-1 font-medium py-2 px-3 rounded text-sm transition-colors ${room.is_available
                                                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                                    }`}
                                            >
                                                {room.is_available ? 'Đánh dấu đã thuê' : 'Đánh dấu có sẵn'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {showModal && selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Chi tiết phòng #{selectedRoom.id}</h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedRoom(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-4 lg:p-6 space-y-6">
                            {/* Room Images */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh phòng</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {selectedRoom.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Room ${selectedRoom.room_number} - Image ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Home className="w-5 h-5" />
                                        Thông tin cơ bản
                                    </h3>
                                    <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Số phòng:</span>
                                            <span className="text-sm font-medium text-gray-900">{selectedRoom.room_number}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Khách sạn:</span>
                                            <span className="text-sm font-medium text-gray-900">{selectedRoom.hotel_name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Loại phòng:</span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(selectedRoom.type)}`}>
                                                {getTypeIcon(selectedRoom.type)}
                                                {getTypeText(selectedRoom.type)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Trạng thái:</span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(selectedRoom.is_available)}`}>
                                                {selectedRoom.is_available ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                                {getAvailabilityText(selectedRoom.is_available)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5" />
                                        Thông tin giá & sức chứa
                                    </h3>
                                    <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Giá mỗi đêm:</span>
                                            <span className="text-sm font-medium text-gray-900">{formatPrice(selectedRoom.price_per_night)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Sức chứa:</span>
                                            <span className="text-sm font-medium text-gray-900">{selectedRoom.capacity} người</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">ID phòng:</span>
                                            <span className="text-sm font-medium text-gray-900">#{selectedRoom.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">ID khách sạn:</span>
                                            <span className="text-sm font-medium text-gray-900">#{selectedRoom.hotel_id}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Thông tin thời gian
                                </h3>
                                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Ngày tạo:</span>
                                        <span className="text-sm font-medium text-gray-900">{formatDateTime(selectedRoom.created_at)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Cập nhật lần cuối:</span>
                                        <span className="text-sm font-medium text-gray-900">{formatDateTime(selectedRoom.updated_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Room Modal */}
            {showEditModal && editingRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Chỉnh sửa phòng</h2>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingRoom(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Số phòng</label>
                                <input
                                    type="text"
                                    name="room_number"
                                    defaultValue={editingRoom.room_number}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Loại phòng</label>
                                <select
                                    name="type"
                                    defaultValue={editingRoom.type}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="single">Phòng đơn</option>
                                    <option value="double">Phòng đôi</option>
                                    <option value="suite">Suite</option>
                                    <option value="family">Phòng gia đình</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Giá mỗi đêm (VND)</label>
                                <input
                                    type="number"
                                    name="price_per_night"
                                    defaultValue={editingRoom.price_per_night}
                                    step="0.01"
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sức chứa</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    defaultValue={editingRoom.capacity}
                                    min="1"
                                    max="10"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                                <select
                                    name="is_available"
                                    defaultValue={editingRoom.is_available.toString()}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="true">Có sẵn</option>
                                    <option value="false">Đã thuê</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingRoom(null);
                                    }}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <Check className="w-4 h-4" />
                                    )}
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="text-center">
                            <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Xác nhận xóa</h3>
                            <p className="text-gray-600 mb-6">
                                Bạn có chắc chắn muốn xóa phòng <strong>{selectedRoom.room_number}</strong>? Hành động này không thể hoàn tác.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedRoom(null);
                                    }}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => deleteRoom(selectedRoom.id)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomManagement;