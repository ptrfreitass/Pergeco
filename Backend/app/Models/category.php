<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'user_id','type'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }
}
