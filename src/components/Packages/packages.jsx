import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import './packages.css';

const Package = ({ packages, addPackage, editPackage, deletePackage }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [packageName, setPackageName] = useState('');
  const [bulletPoints, setBulletPoints] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [packageDuration, setPackageDuration] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discount, setDiscount] = useState(null);

  const handleAddPackageClick = () => {
    setDisplayDialog(true);
    clearFields();
  };

  const handleAddClick = () => {
    if (packageName && bulletPoints && packageCost && packageDuration !== null && uploadedImage) {
      const discountedPrice = hasDiscount 
        ? packageCost - (packageCost * discount / 100) 
        : packageCost;

      const newPackage = {
        name: packageName,
        bulletPoints: bulletPoints,
        cost: packageCost,
        duration: packageDuration,
        image: uploadedImage,
        discountedPrice,
        hasDiscount,
        discount
      };

      if (editIndex !== null) {
        editPackage(editIndex, newPackage);
        setEditIndex(null);
      } else {
        addPackage(newPackage);
      }
      setDisplayDialog(false);
      clearFields();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleBulletPointsChange = (e) => {
    const points = e.target.value.split('\n');
    if (points.length <= 5) {
      setBulletPoints(e.target.value);
    }
  };

  const clearFields = () => {
    setPackageName('');
    setBulletPoints('');
    setPackageCost('');
    setPackageDuration(null);
    setUploadedImage(null);
    setHasDiscount(false);
    setDiscount(null);
  };

  const handleEdit = (index) => {
    const pkg = packages[index];
    setPackageName(pkg.name);
    setBulletPoints(pkg.bulletPoints);
    setPackageCost(pkg.cost);
    setPackageDuration(pkg.duration);
    setUploadedImage(pkg.image);
    setHasDiscount(pkg.hasDiscount);
    setDiscount(pkg.discount);
    setEditIndex(index);
    setDisplayDialog(true);
  };

  const handleDelete = (index) => {
    deletePackage(index);
  };

  const handlePreviewClick = () => {
    setPreviewVisible(true);
  };

  return (
    <div className="container">
      <Button label="+ Add Package" onClick={handleAddPackageClick} className="button-primary add-package-button" />

      <Dialog header={editIndex !== null ? "Edit Package" : "Add Package"} visible={displayDialog} style={{ width: '50vw' }} onHide={() => setDisplayDialog(false)}>
        <div className="fade-in">
          <Button label="Choose File" 
                  onClick={() => document.getElementById('fileInput').click()} 
                  className="button-primary" 
                  style={{ marginTop: '10px' }} />
          <input type="file" accept=".png,.jpg" onChange={handleImageChange} id="fileInput" style={{ display: 'none' }} />

          {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: '200px', height: 'auto', marginTop: '10px', borderRadius: '5px' }} />}
          
          <InputText 
            value={packageName} 
            onChange={(e) => setPackageName(e.target.value.toUpperCase())} 
            placeholder="PACKAGE NAME" 
            style={{ width: '100%', marginTop: '10px' }} 
          />
          
          <InputTextarea 
            value={bulletPoints} 
            onChange={handleBulletPointsChange} 
            placeholder="5 BULLET POINTS (one per line)" 
            style={{ width: '100%', marginTop: '10px' }} 
            rows={5} 
          />
          
          <div className="input-group" style={{ marginTop: '10px' }}>
            <span className="input-group-addon">Rs</span>
            <InputText 
              value={packageCost} 
              onChange={(e) => setPackageCost(e.target.value)} 
              placeholder="PACKAGE COST" 
            />
          </div>
          
          <InputNumber 
            value={packageDuration} 
            onValueChange={(e) => setPackageDuration(e.value)} 
            placeholder="PACKAGE DURATION" 
            suffix=" months" 
            min={1} 
            max={9} 
            style={{ width: '48%', marginTop: '10px' }}
          />

          <div style={{ marginTop: '10px' }}>
            <Checkbox inputId="discount" checked={hasDiscount} onChange={(e) => setHasDiscount(e.checked)} />
            <label htmlFor="discount" className="p-checkbox-label" style={{ marginLeft: '5px' }}>Discount</label>
            {hasDiscount && (
              <InputNumber 
                value={discount} 
                onValueChange={(e) => setDiscount(e.value)} 
                placeholder="DISCOUNT %" 
                suffix="%" 
                min={1} 
                max={99} 
                style={{ marginLeft: '10px' }}
              />
            )}
          </div>
          
          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <Button label={editIndex !== null ? "Save" : "Add"} onClick={handleAddClick} className="button-primary" />
            <Button label="Preview" onClick={handlePreviewClick} className="button-secondary" />
          </div>
        </div>
      </Dialog>

      <Dialog header="Preview Package" visible={previewVisible} style={{ width: '50vw' }} onHide={() => setPreviewVisible(false)}>
        <div className="fade-in">
          {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ width: '200px', height: 'auto', borderRadius: '5px' }} />}
          <p><strong>Package Name:</strong> {packageName}</p>
          <p><strong>Bullet Points:</strong></p>
          <ul>
            {bulletPoints.split('\n').map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <p><strong>Cost:</strong> 
            {hasDiscount ? (
              <>
                Rs. <s>{packageCost}</s> Rs. {(packageCost - (packageCost * discount / 100)).toFixed(2)}
              </>
            ) : (
              `Rs. ${packageCost}`
            )}
          </p>
          <p><strong>Duration:</strong> {packageDuration} months</p>
        </div>
      </Dialog>

      <div className="packages-container">
        {packages.map((pkg, index) => (
          <div key={index} className="package-card">
            {pkg.image && <img src={pkg.image} alt="Package" />}
            <p><strong>Package Name:</strong> {pkg.name}</p>
            <p><strong>Bullet Points:</strong></p>
            <ul>
              {pkg.bulletPoints.split('\n').map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <p><strong>Cost:</strong> 
              {pkg.hasDiscount ? (
                <>
                  Rs. <s>{pkg.cost}</s> Rs. {pkg.discountedPrice.toFixed(2)}
                </>
              ) : (
                `Rs. ${pkg.cost}`
              )}
            </p>
            <p><strong>Duration:</strong> {pkg.duration} months</p>
            <Button label="Edit" onClick={() => handleEdit(index)} className="button-primary" />
            <Button label="Delete" onClick={() => handleDelete(index)} className="button-danger" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;