const { User, FamilySpace } = require('../../models/User');
const { v4: uuidv4 } = require('uuid');

const createFamilySpace = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    if (!name) {
      return res.status(400).json({ message: 'Family Space name is required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.familySpace) {
      return res.status(400).json({ message: 'User is already part of a family space.' });
    }
    const familySpace = new FamilySpace({
      name,
      code: uuidv4(),
      admin: user._id,
      members: [user._id],
    });

    await familySpace.save();

    user.familySpace = familySpace._id;
    await user.save();

    res.status(201).json({ message: 'Family space created successfully.', familySpace });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const joinFamilySpace = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user._id;

    if (!code) {
      return res.status(400).json({ message: 'Invite code is required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.familySpace) {
      return res.status(400).json({ message: 'User is already part of a family space.' });
    }

    const familySpace = await FamilySpace.findOne({ code });
    if (!familySpace) {
      return res.status(404).json({ message: 'Family space not found.' });
    }

    familySpace.members.push(user._id);
    await familySpace.save();

    user.familySpace = familySpace._id;
    await user.save();

    res.status(200).json({ message: 'Successfully joined the family space.', familySpace });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const manageFamilySpace = async (req, res) => {
  try {
    const { memberId, action } = req.body;
    const adminId = req.user._id;

    if (!memberId || !action) {
      return res.status(400).json({ message: 'Member ID and action are required.' });
    }

    const admin = await User.findById(adminId).populate('familySpace');
    const member = await User.findById(memberId);

    if (!admin || !member) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const familySpace = admin.familySpace;

    if (!familySpace || String(familySpace.admin) !== String(admin._id)) {
      return res.status(403).json({ message: 'Unauthorized action.' });
    }

    if (action === 'add') {
      if (familySpace.members.includes(member._id)) {
        return res.status(400).json({ message: 'User is already a member of the family space.' });
      }
      familySpace.members.push(member._id);
      member.familySpace = familySpace._id;
    } else if (action === 'remove') {
      familySpace.members = familySpace.members.filter(
        (id) => String(id) !== String(member._id)
      );
      member.familySpace = null;
    } else {
      return res.status(400).json({ message: 'Invalid action.' });
    }

    await familySpace.save();
    await member.save();

    res.status(200).json({ message: `Member ${action}ed successfully.`, familySpace });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createFamilySpace, joinFamilySpace, manageFamilySpace };