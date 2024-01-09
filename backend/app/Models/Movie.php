<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'overview',
        'release_date',
        'tmdb_id',
        'user_id',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_movie', 'movie_id', 'user_id');
    }
}
