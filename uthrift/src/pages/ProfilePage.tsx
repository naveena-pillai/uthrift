import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import ProfileItemCard from '../components/ProfileItemCard';
import UploadItem from '../components/UploadItem';
import { FaShoppingBag, FaUser } from 'react-icons/fa'; 
import DormPop from '../assets/dormpop-logo.jpeg';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [showLogout, setShowLogout] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [items, setItems] = useState<any[]>([]);
// currentUser is already destructured from useAuth() at the top level

    const loadUserItems = async () => {
        if (!currentUser) return;
        
        const q = query(
            collection(db, 'items'), 
            where('sellerId', '==', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const itemsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setItems(itemsList);
    };

    useEffect(() => {
        loadUserItems();
    }, [currentUser]);

    const handleUploadComplete = async () => {
        await loadUserItems();  // Refresh the items list
        setShowUploadForm(false);  // Close the upload form
    };

    const handleDeleteItem = async (itemId: string) => {
        try {
            await deleteDoc(doc(db, 'items', itemId));
            await loadUserItems(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleUpdateItem = async (itemId: string, updatedData: any) => {
        try {
            await updateDoc(doc(db, 'items', itemId), updatedData);
            await loadUserItems(); // Refresh the list after update
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressData, setAddressData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const handleAddressSubmit = async () => {
        if (!currentUser) return;
        try {
            await setDoc(doc(db, 'users', currentUser.uid), {
                address: addressData.address,
                city: addressData.city,
                postalCode: addressData.postalCode
            }, { merge: true });
            setShowAddressForm(false);
        } catch (error) {
            console.error("Error saving address:", error);
        }
    };

    const loadUserAddress = async () => {
        if (!currentUser) return;
        try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setAddressData(prev => ({
                    ...prev,
                    address: userData.address || '',
                    city: userData.city || '',
                    postalCode: userData.postalCode || ''
                }));
            }
        } catch (error) {
            console.error("Error loading address:", error);
        }
    };

    useEffect(() => {
        loadUserAddress();
    }, [currentUser]);

    // Update the address form JSX:
    return (
        <div className="min-h-screen bg-[#F8F4EC]">
            <div className="bg-[#731B15] p-8 flex justify-between items-center w-full">
                <div className="flex items-center">
                    <FaShoppingBag className="text-white text-3xl" />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <img 
                        src={DormPop} 
                        alt="DormPop" 
                        className="h-16"
                    />
                </div>
                <div 
                    className="flex items-center relative"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                >
                    <FaUser className="text-white text-2xl cursor-pointer" />
                    <div 
                        className={`absolute top-0 right-0 transition-opacity duration-200 ${
                            showLogout ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded shadow-lg hover:bg-red-600 transition-colors whitespace-nowrap mt-8"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-full">
                {/* Vertical Navigation - Now starts below header */}
                {/* Vertical Navigation */}
                <div className="flex flex-col w-64">
                    <div className="bg-[#7E9181]">
                        <div className="flex flex-col space-y-4 pt-2">
                            <button 
                                onClick={() => setShowAddressForm(false)}
                                className="hover:text-white px-10 py-3 text-left border-b-2 border-black w-full"
                            >
                                Current Listings
                            </button>
                            <button 
                                onClick={() => setShowAddressForm(true)}
                                className="hover:text-white px-10 py-3 text-left border-b-2 border-black w-full"
                            >
                                Add Address
                            </button>
                        </div>
                    </div>
                    <div className="bg-[#E8E2D5] flex-1 w-full min-h-[calc(100vh-200px)]"></div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 relative">
                    <h2 className="text-3xl font-bold mb-8">Welcome, {currentUser?.email?.split('@')[0] || 'XXXXX'}!</h2>
                    
                    {showAddressForm ? (
                        <div className="max-w-2xl mx-auto bg-[#F8F4EC] p-8 rounded-lg">
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-gray-700 text-lg mb-2">First name</p>
                                        <input 
                                            type="text"
                                            value={addressData.firstName}
                                            onChange={(e) => setAddressData(prev => ({...prev, firstName: e.target.value}))}
                                            className="w-full bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-[#7E9181] pb-2"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-gray-700 text-lg mb-2">Last name</p>
                                        <input 
                                            type="text"
                                            value={addressData.lastName}
                                            onChange={(e) => setAddressData(prev => ({...prev, lastName: e.target.value}))}
                                            className="w-full bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-[#7E9181] pb-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-700 text-lg mb-2">Address</p>
                                    <input 
                                        type="text"
                                        value={addressData.address}
                                        onChange={(e) => setAddressData(prev => ({...prev, address: e.target.value}))}
                                        className="w-full bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-[#7E9181] pb-2"
                                    />
                                </div>
                                <div>
                                    <p className="text-gray-700 text-lg mb-2">City</p>
                                    <input 
                                        type="text"
                                        value={addressData.city}
                                        onChange={(e) => setAddressData(prev => ({...prev, city: e.target.value}))}
                                        className="w-full bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-[#7E9181] pb-2"
                                    />
                                </div>
                                <div>
                                    <p className="text-gray-700 text-lg mb-2">Postal Code</p>
                                    <input 
                                        type="text"
                                        value={addressData.postalCode}
                                        onChange={(e) => setAddressData(prev => ({...prev, postalCode: e.target.value}))}
                                        className="w-full bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-[#7E9181] pb-2"
                                    />
                                </div>
                                <div className="flex justify-end mt-8">
                                    <button 
                                        onClick={handleAddressSubmit}
                                        className="bg-[#7E9181] text-white px-8 py-3 rounded-full hover:bg-[#98A69B] transition-colors"
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[90%] mx-auto">
                            {items.map((item) => (
                                <ProfileItemCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    thumbnail={item.imageUrl}
                                    seller={currentUser?.email || 'Unknown'}
                                    description={item.description}
                                    material={item.material}
                                    condition={item.condition}
                                    price={item.price}
                                    onDelete={handleDeleteItem}
                                    onUpdate={handleUpdateItem}
                                />
                            ))}
                        </div>
                    )}

                    {/* Add New Product Button */}
                    <button 
                        onClick={() => setShowUploadForm(true)}
                        className="fixed bottom-8 right-8 bg-[#98A69B] text-black px-6 py-3 rounded-full shadow-lg hover:bg-[#7E9181] hover:text-white transition-colors"
                    >
                        Add a new item
                    </button>
                </div>
            </div>

            {showUploadForm && (
                <UploadItem
                    onClose={() => setShowUploadForm(false)}
                    onUploadComplete={handleUploadComplete}
                />
            )}
        </div>
    );
};

export default ProfilePage;
