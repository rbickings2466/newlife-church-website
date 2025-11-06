import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { Video, Plus, Trash2, Eye, EyeOff, Edit2, Save, X } from 'lucide-react';

const AdminPromoPanel = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    videoUrl: '',
    ctaText: '',
    ctaLink: '',
    enabled: true,
    dismissible: true,
    rememberDismissal: true
  });

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const promosRef = collection(db, 'promoBanners');
      const q = query(promosRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const promosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPromos(promosData);
    } catch (error) {
      console.error('Error fetching promos:', error);
      alert('Error loading promo banners');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      videoUrl: '',
      ctaText: '',
      ctaLink: '',
      enabled: true,
      dismissible: true,
      rememberDismissal: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.videoUrl.trim()) {
      alert('Video URL is required');
      return;
    }

    try {
      const promoData = {
        ...formData,
        ctaButton: formData.ctaText ? {
          text: formData.ctaText,
          link: formData.ctaLink
        } : null,
        updatedAt: serverTimestamp()
      };

      // Remove ctaText and ctaLink from the data (they're now in ctaButton)
      delete promoData.ctaText;
      delete promoData.ctaLink;

      if (editingId) {
        // Update existing promo
        const promoRef = doc(db, 'promoBanners', editingId);
        await updateDoc(promoRef, promoData);
        alert('Promo banner updated successfully!');
      } else {
        // Create new promo
        promoData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'promoBanners'), promoData);
        alert('Promo banner created successfully!');
      }

      resetForm();
      fetchPromos();
    } catch (error) {
      console.error('Error saving promo:', error);
      alert('Error saving promo banner');
    }
  };

  const handleEdit = (promo) => {
    setFormData({
      title: promo.title || '',
      subtitle: promo.subtitle || '',
      description: promo.description || '',
      videoUrl: promo.videoUrl || '',
      ctaText: promo.ctaButton?.text || '',
      ctaLink: promo.ctaButton?.link || '',
      enabled: promo.enabled !== false,
      dismissible: promo.dismissible !== false,
      rememberDismissal: promo.rememberDismissal !== false
    });
    setEditingId(promo.id);
    setShowForm(true);
  };

  const handleToggleEnabled = async (promoId, currentStatus) => {
    try {
      const promoRef = doc(db, 'promoBanners', promoId);
      await updateDoc(promoRef, {
        enabled: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchPromos();
    } catch (error) {
      console.error('Error toggling promo:', error);
      alert('Error updating promo status');
    }
  };

  const handleDelete = async (promoId) => {
    if (!window.confirm('Are you sure you want to delete this promo banner?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'promoBanners', promoId));
      alert('Promo banner deleted successfully!');
      fetchPromos();
    } catch (error) {
      console.error('Error deleting promo:', error);
      alert('Error deleting promo banner');
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading promo banners...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Video className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Promo Banners</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showForm ? 'Cancel' : 'Add New Promo'}</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border-2 border-blue-200 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingId ? 'Edit Promo Banner' : 'Create New Promo Banner'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-xs text-gray-500">YouTube URL in any format</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Easter Sunday Service"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="April 20th at 10:00 AM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Join us as we celebrate..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="Plan Your Visit"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                placeholder="#visit"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Enabled (show on website)</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.dismissible}
                onChange={(e) => setFormData({ ...formData, dismissible: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Dismissible (users can close)</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberDismissal}
                onChange={(e) => setFormData({ ...formData, rememberDismissal: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Remember dismissal</span>
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'Update' : 'Create'} Promo</span>
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Promos List */}
      <div className="space-y-4">
        {promos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No promo banners yet</p>
            <p className="text-sm text-gray-500 mt-1">Click "Add New Promo" to create your first one</p>
          </div>
        ) : (
          promos.map((promo) => (
            <div
              key={promo.id}
              className={`bg-white p-6 rounded-lg border-2 ${
                promo.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {promo.title || 'Untitled Promo'}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        promo.enabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {promo.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  {promo.subtitle && (
                    <p className="text-sm text-gray-600 mb-2">{promo.subtitle}</p>
                  )}
                  {promo.description && (
                    <p className="text-sm text-gray-700 mb-3">{promo.description}</p>
                  )}
                  <p className="text-xs text-gray-500 break-all">
                    Video: {promo.videoUrl}
                  </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleToggleEnabled(promo.id, promo.enabled)}
                    className={`p-2 rounded-lg transition-colors ${
                      promo.enabled
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={promo.enabled ? 'Disable' : 'Enable'}
                  >
                    {promo.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(promo)}
                    className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id)}
                    className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPromoPanel;
