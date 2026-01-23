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
import { AlertTriangle, Plus, Trash2, Eye, EyeOff, Edit2, Save, X, AlertCircle, Info, CheckCircle } from 'lucide-react';

const ALERT_TYPES = [
  { value: 'urgent', label: 'Urgent (Red)', icon: AlertTriangle, color: 'bg-red-500' },
  { value: 'warning', label: 'Warning (Yellow)', icon: AlertCircle, color: 'bg-yellow-500' },
  { value: 'info', label: 'Info (Blue)', icon: Info, color: 'bg-blue-500' },
  { value: 'success', label: 'Success (Green)', icon: CheckCircle, color: 'bg-green-500' }
];

const AdminAlertPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'urgent',
    title: '',
    message: '',
    linkText: '',
    linkUrl: '',
    enabled: true,
    dismissible: true
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const alertsRef = collection(db, 'alerts');
      const q = query(alertsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const alertsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAlerts(alertsData);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      alert('Error loading alerts');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'urgent',
      title: '',
      message: '',
      linkText: '',
      linkUrl: '',
      enabled: true,
      dismissible: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      alert('Message is required');
      return;
    }

    try {
      const alertData = {
        type: formData.type,
        title: formData.title.trim() || null,
        message: formData.message.trim(),
        link: formData.linkText && formData.linkUrl ? {
          text: formData.linkText,
          url: formData.linkUrl
        } : null,
        enabled: formData.enabled,
        dismissible: formData.dismissible,
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        const alertRef = doc(db, 'alerts', editingId);
        await updateDoc(alertRef, alertData);
        alert('Alert updated successfully!');
      } else {
        alertData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'alerts'), alertData);
        alert('Alert created successfully!');
      }

      resetForm();
      fetchAlerts();
    } catch (error) {
      console.error('Error saving alert:', error);
      alert('Error saving alert');
    }
  };

  const handleEdit = (alertItem) => {
    setFormData({
      type: alertItem.type || 'urgent',
      title: alertItem.title || '',
      message: alertItem.message || '',
      linkText: alertItem.link?.text || '',
      linkUrl: alertItem.link?.url || '',
      enabled: alertItem.enabled !== false,
      dismissible: alertItem.dismissible !== false
    });
    setEditingId(alertItem.id);
    setShowForm(true);
  };

  const handleToggleEnabled = async (alertId, currentStatus) => {
    try {
      const alertRef = doc(db, 'alerts', alertId);
      await updateDoc(alertRef, {
        enabled: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchAlerts();
    } catch (error) {
      console.error('Error toggling alert:', error);
      alert('Error updating alert status');
    }
  };

  const handleDelete = async (alertId) => {
    if (!window.confirm('Are you sure you want to delete this alert?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'alerts', alertId));
      alert('Alert deleted successfully!');
      fetchAlerts();
    } catch (error) {
      console.error('Error deleting alert:', error);
      alert('Error deleting alert');
    }
  };

  const getTypeInfo = (type) => ALERT_TYPES.find(t => t.value === type) || ALERT_TYPES[0];

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading alerts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900">Alert Banners</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showForm ? 'Cancel' : 'Add New Alert'}</span>
        </button>
      </div>

      {/* Info box */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800">
        <strong>Quick Announcements:</strong> Use alerts for weather cancellations, schedule changes, or important notices.
        Only one alert can be active at a time - the most recently enabled alert will be shown.
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border-2 border-orange-200 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingId ? 'Edit Alert' : 'Create New Alert'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {ALERT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Weather Cancellation"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Due to winter weather, all Sunday services are canceled. Stay safe!"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Text (Optional)</label>
              <input
                type="text"
                value={formData.linkText}
                onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                placeholder="Learn More"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link URL (Optional)</label>
              <input
                type="text"
                value={formData.linkUrl}
                onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                placeholder="#events or https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Enabled (show on website)</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.dismissible}
                onChange={(e) => setFormData({ ...formData, dismissible: e.target.checked })}
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Dismissible (users can close)</span>
            </label>
          </div>

          {/* Preview */}
          {formData.message && (
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className={`${getTypeInfo(formData.type).color} text-white py-3 px-4 rounded-lg`}>
                <div className="flex items-center justify-center gap-3">
                  {React.createElement(getTypeInfo(formData.type).icon, { className: "w-5 h-5 opacity-75" })}
                  <p className="text-sm">
                    {formData.title && <span className="font-bold mr-1">{formData.title}:</span>}
                    {formData.message}
                    {formData.linkText && formData.linkUrl && (
                      <span className="ml-2 underline">{formData.linkText} →</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'Update' : 'Create'} Alert</span>
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

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No alerts yet</p>
            <p className="text-sm text-gray-500 mt-1">Click "Add New Alert" to create one for weather cancellations or announcements</p>
          </div>
        ) : (
          alerts.map((alertItem) => {
            const typeInfo = getTypeInfo(alertItem.type);
            return (
              <div
                key={alertItem.id}
                className={`bg-white p-6 rounded-lg border-2 ${
                  alertItem.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${typeInfo.color}`}></div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {alertItem.title || 'Untitled Alert'}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-700">
                        {typeInfo.label}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          alertItem.enabled
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {alertItem.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{alertItem.message}</p>
                    {alertItem.link && (
                      <p className="text-sm text-blue-600">
                        Link: {alertItem.link.text} → {alertItem.link.url}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleEnabled(alertItem.id, alertItem.enabled)}
                      className={`p-2 rounded-lg transition-colors ${
                        alertItem.enabled
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={alertItem.enabled ? 'Disable' : 'Enable'}
                    >
                      {alertItem.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(alertItem)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(alertItem.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminAlertPanel;
