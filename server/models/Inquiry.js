const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { isMongoConnected } = require('../config/db');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  projectType: {
    type: String,
    required: true,
    default: 'Headless CMS'
  },
  budget: {
    type: String,
    default: 'Flexible'
  },
  brief: {
    type: String,
    required: [true, 'Project brief is required'],
    trim: true
  },
  currency: {
    type: String,
    enum: ['INR', 'USD'],
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Proposal Sent', 'Contracted', 'Archived'],
    default: 'New'
  },
  scopeConfig: {
    type: Object,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MongoInquiry = mongoose.model('Inquiry', inquirySchema);

// Fallback JSON store helpers
const dataFilePath = path.join(__dirname, '../data/inquiries.json');

const readFallbackStore = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading fallback inquiries:', err);
    return [];
  }
};

const writeFallbackStore = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving fallback inquiries:', err);
  }
};

// Unified DAO interface
class InquiryService {
  static async create(data) {
    if (isMongoConnected()) {
      return await MongoInquiry.create(data);
    } else {
      const items = readFallbackStore();
      const newItem = {
        _id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        ...data,
        status: 'New',
        createdAt: new Date().toISOString()
      };
      items.unshift(newItem);
      writeFallbackStore(items);
      return newItem;
    }
  }

  static async find(query = {}) {
    if (isMongoConnected()) {
      return await MongoInquiry.find(query).sort({ createdAt: -1 });
    } else {
      const items = readFallbackStore();
      return items;
    }
  }

  static async findById(id) {
    if (isMongoConnected()) {
      return await MongoInquiry.findById(id);
    } else {
      const items = readFallbackStore();
      return items.find(item => item._id === id) || null;
    }
  }

  static async findByIdAndDelete(id) {
    if (isMongoConnected()) {
      return await MongoInquiry.findByIdAndDelete(id);
    } else {
      const items = readFallbackStore();
      const filtered = items.filter(item => item._id !== id);
      writeFallbackStore(filtered);
      return { success: true, id };
    }
  }
}

module.exports = { MongoInquiry, InquiryService };
